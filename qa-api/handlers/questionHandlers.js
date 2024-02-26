import * as questionService from "../services/questionService.js";

export const handleGetQuestion = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.questionId;
    const question = await questionService.findById(questionId);

    console.log(`Question with id ${questionId} retrieved from the database`);

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

    const questions = await questionService.findAllByCourseId(courseId, userUuid);

    console.log(`Questions retrieved from the database for course ${courseId}`);

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

        const MAX_TITLE_LENGTH = 200;

        const isEmptyString = (str) => {
            return str === null || str === undefined || str.trim() === ''
        }

        // Check the title is not empty and is not too long
        if (isEmptyString(title)) {
            return Response.json({ error: 'The title field is empty.'}, { status: 400 });
        } else if (title.length > MAX_TITLE_LENGTH) {
            return Response.json({ error: 'The title is too long (should have less than 200 characters)'}, { status: 400 });
        }

        // Check the content is not empty
        if (isEmptyString(content)) {
            return Response.json({ error: 'The content field is empty.'}, { status: 400 });
        }

        // Store the question in the database
        const newQuestion = await questionService.createQuestion(Number(courseId), userUuid, title, content);

        console.log(`Question ${newQuestion.id} created and stored in the database for course ${newQuestion.courseId}`);

        // Indicates that a new resource was created and send the new question
        return Response.json(newQuestion, { status: 201 });
    } catch (error) {
        console.error(`Failed to create question: ${error}`);

        return Response.json({ error: 'Failed to create question' }, { status: 500 });
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
    const questionId = urlPatternResult.pathname.groups.questionId;
    const { userUuid } = await request.json();

    // Insert a log for the user that upvote the question
    const questionUpvoteLog  = await questionService.createUpvoteLog(questionId, userUuid);

    // If the insert does not return any value, it means that the upvote has already been created
    if (questionUpvoteLog === undefined) {
        console.warn(`Question ${questionId} already upvoted by user ${userUuid}`);

        // Even if the right status code would be "409", we send a 200 (OK) code to avoid the error to be automatically
        // handled by the browser
        return Response.json({ error: 'The user has already upvoted the question.' }, { status: 200 });
    }

    const question = await questionService.upvoteQuestion(questionId);

    console.log(`Question ${questionId} upvoted by user ${userUuid}`);

    return Response.json(question, { status: 200 });
}