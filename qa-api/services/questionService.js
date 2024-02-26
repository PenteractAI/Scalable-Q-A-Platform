import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";

/**
 * Find a question by its ID, including whether the user has upvoted it
 *
 * @param id
 * @returns {Promise<Object|Array>}
 */
export const findById = async (id, userUuid) => {
    const results = await sql`
        SELECT
            q.id,
            q.course_id,
            q.user_uuid,
            q.title,
            q.content,
            q.creation_time,
            q.upvote_count,
            q.last_upvote_time,
            (qv.user_uuid IS NOT NULL) AS user_has_upvoted
        FROM
            questions as q
        LEFT JOIN
            question_votes as qv ON q.id = qv.id
            AND qv.user_uuid = ${userUuid}
        WHERE
            q.id = ${id}
    `;

    return toCamelCase(results[0]);
}

/**
 * Finds 20 questions for a course ordered by recency, including whether the user has upvoted them
 *
 * @returns {Promise<Object|Array>}
 */
export const findAllByCourseId = async (courseId, userUuid) => {
    const results = await sql`
        SELECT
            q.id, 
            q.course_id, 
            q.user_uuid, 
            q.title, 
            q.content, 
            q.creation_time, 
            q.upvote_count, 
            q.last_upvote_time,
            (qv.user_uuid IS NOT NULL) AS user_has_upvoted
        FROM
            questions as q
        LEFT JOIN
            question_votes as qv ON q.id = qv.id 
            AND qv.user_uuid = ${userUuid}
        WHERE
            course_id = ${courseId}
        ORDER BY
            GREATEST(creation_time, last_upvote_time) DESC
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
            upvote_count = upvote_count + 1,
            last_upvote_time = CURRENT_TIMESTAMP
        WHERE
            id = ${id}
        RETURNING 
            id
    `;

    return toCamelCase(results[0]);
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
            question_votes (id, user_uuid)
        VALUES
            (${id}, ${userUuid})
        ON CONFLICT (id, user_uuid)
            DO NOTHING
        RETURNING 
            id, user_uuid, upvote_time
    `;

    return toCamelCase(results[0]);
}