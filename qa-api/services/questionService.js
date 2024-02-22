import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";

/**
 * Finds all questions for a course
 *
 * @returns {Promise<Object|Array>}
 */
export const findAllByCourseId = async(courseId) => {
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