import * as answerService from '../services/answerService.js';

/**
 * Handler for retrieving all answers for a question
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetAnswers = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.questionId;
    const answers = await answerService.findAllByQuestionId(questionId);

    console.log(`Answers retrieved from the database for question ${questionId}`);

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

    const answer = await answerService.upvoteAnswer(answerId);

    console.log(`Answer ${answerId} upvoted by user ${userUuid}`);

    return Response.json(answer, { status: 200 });
}