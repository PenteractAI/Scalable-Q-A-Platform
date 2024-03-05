import * as answerRepository from "../repositories/answerRepository.js";
import * as cacheService from "./cacheService.js";
import {Answer} from "../models/answer.js";


/**
 * Returns 20 answers for a question ordered by recency, including whether the user has upvoted them
 *
 * @param questionId
 * @returns {Promise<Object|Array>}
 */
export const findAllByQuestionId = async (questionId, userUuid, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    return await answerRepository.findAllByQuestionId(questionId, userUuid, pageSize, offset);
}

/**
 * Create a new answer for a question
 *
 * @param questionId
 * @param userUuid
 * @param content
 * @returns {Promise<Object|Array>}
 */
export const createAnswer = async (questionId, userUuid, content) => {

    const answer = new Answer({
       questionId, userUuid, content
    });

    answer.validate();

    // Ensure that the user can post a new answer
    const type = 'answer';
    if(!(await cacheService.canPost(userUuid, type))) {
        throw new Error('You can submit only one answer per minute. Please wait a bit before trying again.');
    }

    // Create a new answer instance and store it in the database
    const newAnswer = await answerRepository.createAnswer(questionId, userUuid, content);

    // Store the entry of the user in a cache with a TTL of 60 seconds
    await cacheService.storeWithTTL(newAnswer.userUuid, type);

    // Publish the answer in Redis to trigger subscribers
    cacheService.publishMessage(`question:${newAnswer.questionId}:answers`, newAnswer);

    console.log(`Answer ${newAnswer.id} created and stored in the database for question ${questionId}`);

    return newAnswer;
}

/**
 * Increment the upvote count of an anwser by one
 *
 * @param id
 * @param userUuid
 * @returns {Promise<Object|Array>}
 */
export const upvoteAnswer = async (id) => {
    return await answerRepository.upvoteAnswer(id);
}

/**
 * Create a log for an upvote made by an user
 *
 * @param id
 * @param userUuid
 * @returns {Promise<Object|Array>}
 */
export const createUpvoteLog = async (id, userUuid) => {
    return await answerRepository.createUpvoteLog(id, userUuid);
}