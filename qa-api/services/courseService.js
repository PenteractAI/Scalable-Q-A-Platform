import * as courseRepository from "../repositories/courseRepository.js";

/**
 * Finds all courses
 *
 * @returns {Promise<Object|Array>}
 */
export const findAll = async() => {
    return await courseRepository.findAll();
}