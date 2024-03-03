import * as questionService from "../services/questionService.js";
import * as cacheService from "../services/cacheService.js";
import {createAnswer} from "../services/answerService.js";

export const handleGetQuestion = async (request, urlPatternResult) => {
    const questionId = urlPatternResult.pathname.groups.questionId;
    const userUuid = request.headers.get('User-UUID');

    const question = await questionService.findById(questionId, userUuid);

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

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'), 10) || 1;
    const pageSize = Number(url.searchParams.get('pageSize'), 10) || 20;
    const offset = (page - 1) * pageSize;

    const questions = await questionService.findAllByCourseId(courseId, userUuid, pageSize, offset);

    console.log(`Questions retrieved from the database for course ${courseId} (page ${page})`);

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
        const TTL = 60;
        const TYPE = 'question';

        /**
         * Step 1. Check that the user is able to post a new question
         * Each user can post only one question per minute
         */
        if(await cacheService.canPost(userUuid, TYPE)) {
            await cacheService.storeWithTTL(userUuid, TYPE, TTL);
        } else {
            return Response.json({ error: 'You can submit only one question per minute. Please wait a bit before trying again.'}, { status: 429 });
        }

        /**
         * Step 2. Check the validity of the question
         */
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

        /**
         * Step 3. Store the question in the database
         */
        const newQuestion = await questionService.createQuestion(Number(courseId), userUuid, title, content);

        console.log(`Question ${newQuestion.id} created and stored in the database for course ${newQuestion.courseId}`);

        /**
         * Step 4. Call the LLM API for generating three asynchronously
         */
        generateAnswers(newQuestion.id, newQuestion.title);

        /**
         * Step 5. Return the answer to the front
         */
        return Response.json(newQuestion, { status: 201 });
    } catch (error) {
        console.error(`Failed to create question: ${error}`);

        return Response.json({ error: 'Failed to create question' }, { status: 500 });
    }
}

const generateAnswers = async (questionId, title) => {
    const MAX_GENERATED_ANSWERS = 3;
    for (let i = 0; i < MAX_GENERATED_ANSWERS; i++) {
        const response = await fetch("http://llm-api:7000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: title
            })
        });

        const data = await response.json();

        // Store the question in the database
        const newAnswer = await createAnswer(questionId, "Doctor Robotnik", data[0].generated_text);

        console.log(`Answer ${newAnswer.id} created and stored in the database for question ${questionId}`);
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