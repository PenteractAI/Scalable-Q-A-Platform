import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";


/**
 * Returns 20 answers for a question ordered by recency
 *
 * @param questionId
 * @returns {Promise<Object|Array>}
 */
export const findAllByQuestionId = async (questionId) => {
    const results = await sql`
        SELECT 
            id, question_id, user_uuid, content, creation_time, upvote_count, last_upvote_time
        FROM
            answers
        WHERE
            question_id = ${questionId}
        ORDER BY
            GREATEST(creation_time, last_upvote_time) DESC
        LIMIT 20;
    `;

    return toCamelCase(results);
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

    return toCamelCase(results[0]);
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

    return toCamelCase(results[0]);
}