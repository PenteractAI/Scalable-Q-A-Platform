import { sql } from "../database/database.js";
import { toCamelCase } from "../utils/objectKeyTransforms.js";

/**
 * Finds all courses
 *
 * @returns {Promise<Object|Array>}
 */
export const findAll = async() => {
    const results = await sql`
        SELECT
            id, title, description
        FROM
            courses
    `;

    return toCamelCase(results);
}