import * as courseRepository from "../repositories/courseRepository.js";
import {cacheMethodCalls} from "../utils/cacheUtil.js";

const cachedCourseRepo = cacheMethodCalls(courseRepository, []);

/**
 * Finds all courses
 *
 * @returns {Promise<Object|Array>}
 */
export const findAll = async () => {
    return await cachedCourseRepo.findAll();
}

/**
 * Find a course by its ID
 *
 * @returns {Promise<void>}
 */
export const findById = async (id) => {
    return await cachedCourseRepo.findById(id);
}