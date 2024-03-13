import * as courseService from "../services/courseService.js";

/**
 * Handler for retrieving all courses
 *
 * @param request
 * @returns {Promise<Response>}
 */
export const handleGetCourses = async (request) => {
    const courses = await courseService.findAll();

    console.log(`All courses retrieved from the database.`);

    return Response.json(courses);
}

/**
 * Handler for retrieving a course by its ID
 *
 * @param request
 * @param urlPatternResult
 * @returns {Promise<Response>}
 */
export const handleGetCourse = async (request, urlPatternResult) => {
    const courseId = urlPatternResult.pathname.groups.courseId;

    const course = await courseService.findById(courseId);

    return Response.json(course, { status: 200 });

}