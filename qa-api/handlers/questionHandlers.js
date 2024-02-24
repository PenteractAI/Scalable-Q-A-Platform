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
    const questions = await questionService.findAllByCourseId(courseId);

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
