import * as questionService from "../services/questionService.js";
import {subClient} from "../utils/redis.js";

/**
 * Handler for retrieving a question by its ID
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetQuestion = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.questionId;
    const userUuid = request.headers.get('User-UUID');

    const question = await questionService.findById(questionId, userUuid);

    return Response.json(question, { status: 200 });
}

/**
 * Handler for retrieving all questions for a course
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetQuestions = async (request, urlPatternResult) => {
    const courseId = urlPatternResult.pathname.groups.courseId;
    const userUuid = request.headers.get('User-UUID');

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 20;

    const questions = await questionService.findAllByCourseId(courseId, userUuid, page, pageSize);

    return Response.json(questions, { status: 200 });
}

/**
 * Handler for creating a new question for a course
 *
 * @param request
 * @returns {Promise<Response>}
 */
export const handleCreateQuestion = async (request) => {
    try {
        const { courseId, userUuid, title, content } = await request.json();
        const question = await questionService.createQuestion(courseId, userUuid, title, content)
        return Response.json(question, { status: 201 });
    } catch (error) {
        console.error(`Failed to create question: ${error}`);

        return Response.json({ error: error.message }, { status: 500 });
    }
}

/**
 * Handler for upvoting a question
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleUpvoteQuestion = async (request, urlPatternResult) => {
    try {
        const questionId = urlPatternResult.pathname.groups.questionId;
        const { userUuid } = await request.json();

        const question = await questionService.upvote(questionId, userUuid);

        return Response.json(question, { status: 200 });
    } catch (error) {
        console.error(`Failed to upvote question: ${error}`);

        return Response.json({ error: error.message }, { status: 500 });
    }

}

/**
 * WebSocket connection to send new questions to the view
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<*>}
 */
export const handleRetrieveNewQuestions = async (request, urlPatternResult) => {

    console.log("WebSocket connection attempt received");

    const { socket, response } = Deno.upgradeWebSocket(request);

    const courseId = urlPatternResult.pathname.groups.courseId;

    socket.onopen = async () => {
        console.log("WebsSocket connection opened.");
        await subClient.subscribe(`course:${courseId}:questions`, async (message) => {
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