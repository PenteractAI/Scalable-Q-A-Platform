import * as questionRepository from "../repositories/questionRepository.js";
import {Question} from "../models/question.js";
import * as cacheService from "./cacheService.js";
import {createAnswer} from "./answerService.js";

/**
 * Find a question by its ID, including whether the user has upvoted it
 *
 * @param id
 * @returns {Promise<Object|Array>}
 */
export const findById = async (id, userUuid) => {
    const question = await questionRepository.findById(id, userUuid);
    console.log(`Question with id ${id} retrieved from the database`);
    return question;
}

/**
 * Finds 20 questions for a course ordered by recency, including whether the user has upvoted them
 *
 * @returns {Promise<Object|Array>}
 */
export const findAllByCourseId = async (courseId, userUuid, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    const questions =  await questionRepository.findAllByCourseId(courseId, userUuid, pageSize, offset);
    console.log(`Questions retrieved from the database for course ${courseId} (page ${page})`);
    return questions;
}

/**
 * Create a new question in the database
 *
 * @param courseId
 * @param userUuid
 * @param title
 * @param content
 * @returns {Promise<Object|Array>}
 */
export const createQuestion = async (courseId, userUuid, title, content) => {

    // Check the validity of the question
    const question = new Question({
       courseId,
       userUuid,
       title,
       content
    });

    question.validate();

    // Ensure that the user can post a new question
    const type = 'question';
    if(!(await cacheService.canPost(question.userUuid, type))) {
        throw new Error('You can submit only one question per minute. Please wait a bit before trying again.');
    }

    // Create a new question instance and store it in the database
    const newQuestion = await questionRepository.createQuestion(courseId, userUuid, title, content);

    // Store the entry of the user in a cache with a TTL of 60 seconds
    await cacheService.storeWithTTL(newQuestion.userUuid, type);

    // Publish the question in Redis to trigger subscribers
    cacheService.publishMessage(`course:${newQuestion.courseId}:questions`, newQuestion);

    // Generate 3 answers with LLM-API
    generateAnswers(newQuestion.id, newQuestion.title);

    console.log(`Question ${newQuestion.id} created and stored in the database for course ${newQuestion.courseId}`);

    return newQuestion;
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
 * Upvote a question by increment the upvote count and create a log for the user
 *
 * @param questionId
 * @param userUuid
 * @returns {Promise<Object|Array|Response>}
 */
export const upvote = async (questionId, userUuid) => {
    // Insert a log for the user that upvote the question
    const questionUpvoteLog  = await questionRepository.createUpvoteLog(questionId, userUuid);

    // If the insert does not return any value, it means that the upvote has already been created
    if (questionUpvoteLog === undefined) {
        throw new Error('The user has already upvoted the question.');
    }

    const question = await questionRepository.upvoteQuestion(questionId);

    console.log(`Question ${questionId} upvoted by user ${userUuid}`);

    return question;
}