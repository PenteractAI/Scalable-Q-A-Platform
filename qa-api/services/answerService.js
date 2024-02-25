import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";


/**
 * Returns 20 answers for a question
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
        LIMIT 20;
    `;

    return toCamelCase(results);
}