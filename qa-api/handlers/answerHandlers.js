import * as answerService from '../services/answerService.js';
import {subClient} from "../utils/redis.js";

/**
 * Handler for retrieving all answers for a question
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetAnswers = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.questionId;
    const userUuid = request.headers.get('User-UUID');

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 20;

    const answers = await answerService.findAllByQuestionId(questionId, userUuid, page, pageSize);

    console.log(`Answers retrieved from the database for question ${questionId} (page ${page})`);

    return Response.json(answers, { status: 200 });
}

/**
 * Handler for creating a new answer for a question
 *
 * @param request
 * @returns {Promise<Response>}
 */
export const handleCreateAnswer = async (request) => {
    try {
        const { questionId, userUuid, content } = await request.json();
        const newAnswer = await answerService.createAnswer(questionId, userUuid, content);
        return Response.json(newAnswer, { status: 201 });
    } catch (error) {
        console.error(`Failed to create answer: ${error}`);

        return Response.json({ error: error.message }, { status: 500 });
    }
}


/**
 * Handler for upvoting an answer
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleUpvoteAnswer = async (request, urlPatternResult) => {
    const answerId = urlPatternResult.pathname.groups.answerId;
    const { userUuid } = await request.json();

    // Insert a log for the user that upvote the answer
    const answerUpvoteLog = await answerService.createUpvoteLog(answerId, userUuid);

    // If the insert does not return any value, it means that the upvote has already been created
    if (answerUpvoteLog === undefined) {
        console.warn(`Answer ${answerId} already upvoted by user ${userUuid}`);

        // Even if the right status code would be "409", we send a 200 (OK) code to avoid the error to be automatically
        // handled by the browser
        return Response.json({ error: 'The user has already upvoted the answer.' }, { status: 200 });
    }

    const answer = await answerService.upvoteAnswer(answerId);

    console.log(`Answer ${answerId} upvoted by user ${userUuid}`);

    return Response.json(answer, { status: 200 });
}

/**
 * WebSocket connection to send new answers to the view
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<*>}
 */
export const handleRetrieveNewAnswers = async (request, urlPatternResult) => {

    console.log("WebSocket connection attempt received");

    const { socket, response } = Deno.upgradeWebSocket(request);
    const questionId = urlPatternResult.pathname.groups.questionId;

    socket.onopen = async () => {
        console.log("WebsSocket connection opened.");
        await subClient.subscribe(`question:${questionId}:answers`, async (message) => {
            if (socket.readyState === WebSocket.OPEN) socket.send(message);
        });
    }

    socket.onmessage = async (event) => {
        const jsonData = JSON.parse(event.data);
        console.log(jsonData);
    }

    socket.onerror = (error) => {
        console.log("WebSocket error: ", error);
    }

    socket.onclose = (event) => {
        console.log("WebSocket connection closed: ", event.code, event.reason);
    }

    return response;
}