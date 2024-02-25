import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";

/**
 * Find a question by its ID
 *
 * @param id
 * @returns {Promise<Object|Array>}
 */
export const findById = async (id) => {
    const results = await sql`
        SELECT
            id, course_id, user_uuid, title, content, creation_time, upvote_count, last_upvote_time
        FROM
            questions
        WHERE
            id = ${id}
    `;

    return toCamelCase(results[0]);
}

/**
 * Finds 20 questions for a course
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
        LIMIT 20
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
            id, course_id, user_uuid, title, content, creation_time, upvote_count, last_upvote_time
    `;

    return toCamelCase(results[0]);
}

/**
 * Increment the upvote count of a question by one
 *
 * @param id
 * @param userUuid
 * @returns {Promise<Object|Array>}
 */
export const upvoteQuestion = async (id) => {
    const results = await sql`
        UPDATE
            questions
        SET
            upvote_count = upvote_count + 1
        WHERE
            id = ${id}
        RETURNING 
            id
    `;

    return toCamelCase(results[0]);
}