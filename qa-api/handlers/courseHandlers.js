import * as courseService from "../services/courseService.js";

export const handleGetCourses = async (request) => {
    const courses = await courseService.findAll();

    console.log(`All courses retrieved from the database.`);

    return Response.json(courses);
}
