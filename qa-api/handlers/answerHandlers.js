import * as answerService from '../services/answerService.js';
import * as cacheService from "../services/cacheService.js";

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
    const page = Number(url.searchParams.get('page'), 10) || 1;
    const pageSize = Number(url.searchParams.get('pageSize'), 10) || 20;
    const offset = (page - 1) * pageSize;

    const answers = await answerService.findAllByQuestionId(questionId, userUuid, pageSize, offset);

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

        const TTL = 60;
        const TYPE = 'answer';

        if(await cacheService.canPost(userUuid, TYPE)) {
            await cacheService.storeWithTTL(userUuid, TYPE, TTL);
        } else {
            return Response.json({ error: 'You can submit only one answer per minute. Please wait a bit before trying again.'}, { status: 429 });
        }

        const isEmptyString = (str) => {
            return str === null || str === undefined || str.trim() === ''
        }

        // Check the content is not empty
        if (isEmptyString(content)) {
            return Response.json({ error: 'The content field is empty.'}, { status: 400 });
        }

        // Store the question in the database
        const newAnswer = await answerService.createAnswer(questionId, userUuid, content);

        console.log(`Answer ${newAnswer.id} created and stored in the database for question ${questionId}`);

        // Indicates that a new resource was created and send the new question
        return Response.json(newAnswer, { status: 201 });
    } catch (error) {
        console.error(`Failed to create answer: ${error}`);

        return Response.json({ error: 'Failed to create answer' }, { status: 500 });
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