import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";

/**
 * Finds all questions for a course
 *
 * @returns {Promise<Object|Array>}
 */
export const findAllByCourseId = async (courseId) => {
    const results = await sql`
        SELECT
            id, course_id, user_uuid, title, content, creation_time, upvote_count, last_upvote_time
        FROM
            questions
        WHERE
            course_id = ${courseId}
    `;

    return toCamelCase(results);
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
    const results = await sql`
        INSERT INTO
            questions (course_id, user_uuid, title, content)
        VALUES 
            (${courseId}, ${userUuid}, ${title}, ${content})
        RETURNING
            id, course_id, user_uuid, title, content, creation_time
    `;

    return toCamelCase(results[0]);
}