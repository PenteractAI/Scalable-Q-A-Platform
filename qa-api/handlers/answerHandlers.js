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