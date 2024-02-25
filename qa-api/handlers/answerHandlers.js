import * as answerService from '../services/answerService.js';

/**
 * Handler for retrieving all answers for a question
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetAnswers = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.courseId;
    const answers = await answerService.findAllByQuestionId(questionId);

    console.log(`Answers retrieved from the database for question ${questionId}`);

    return Response.json(answers, { status: 200 });
}