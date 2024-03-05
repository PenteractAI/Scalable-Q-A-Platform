import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";
import {Answer} from "../models/answer.js";


/**
 * Returns 20 answers for a question ordered by recency, including whether the user has upvoted them
 *
 * @param questionId
 * @returns {Promise<Object|Array>}
 */
export const findAllByQuestionId = async (questionId, userUuid, pageSize, offset) => {
    const results = await sql`
        SELECT 
           a. id, 
           a.question_id, 
           a.user_uuid, 
           a.content, 
           a.creation_time, 
           a.upvote_count, 
           a.last_upvote_time,
           (av.user_uuid IS NOT NULL) AS user_has_upvoted
        FROM
            answers AS a
        LEFT JOIN
            answer_votes AS av ON a.id = av.id
            AND av.user_uuid = ${userUuid}
        WHERE
            question_id = ${questionId}
        ORDER BY
            GREATEST(creation_time, last_upvote_time) DESC
        LIMIT 
            ${pageSize}
        OFFSET 
            ${offset}
    `;

    return results.map(result => new Answer(toCamelCase(result)));
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
    const results = await sql`
        INSERT INTO
            answers (question_id, user_uuid, content)
        VALUES 
            (${questionId}, ${userUuid}, ${content})
        RETURNING
            id, question_id, user_uuid, content, creation_time, upvote_count, last_upvote_time
    `;

    return new Answer(toCamelCase(results[0]));
}

/**
 * Increment the upvote count of an anwser by one
 *
 * @param id
 * @param userUuid
 * @returns {Promise<Object|Array>}
 */
export const upvoteAnswer = async (id) => {
    const results = await sql`
        UPDATE
            answers
        SET
            upvote_count = upvote_count + 1,
            last_upvote_time = CURRENT_TIMESTAMP
        WHERE
            id = ${id}
        RETURNING 
            id
    `;

    return new Answer(toCamelCase(results[0]));
}

/**
 * Create a log for an upvote made by an user
 *
 * @param id
 * @param userUuid
 * @returns {Promise<Object|Array>}
 */
export const createUpvoteLog = async (id, userUuid) => {
    const results = await sql`
        INSERT INTO
            answer_votes (id, user_uuid)
        VALUES
            (${id}, ${userUuid})
        ON CONFLICT (id, user_uuid)
            DO NOTHING
        RETURNING 
            id, user_uuid, upvote_time
    `;

    return new Answer(toCamelCase(results[0]));
}