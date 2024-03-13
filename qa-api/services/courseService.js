import * as courseRepository from "../repositories/courseRepository.js";

/**
 * Finds all courses
 *
 * @returns {Promise<Object|Array>}
 */
export const findAll = async () => {
    return await courseRepository.findAll();
}

/**
 * Find a course by its ID
 *
 * @returns {Promise<void>}
 */
export const findById = async (id) => {
    return await courseRepository.findById(id);
}