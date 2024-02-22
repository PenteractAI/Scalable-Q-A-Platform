import * as courseService from "../services/courseService.js";

export const handleGetCourses = async (request) => {
    const courses = await courseService.findAll();

    console.log(courses);

    return Response.json(courses);
}
