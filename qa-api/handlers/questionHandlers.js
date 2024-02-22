import * as questionService from "../services/questionService.js";

export const handleGetQuestions = async (request, urlPatternResult) => {
    const courseId = urlPatternResult.pathname.groups.courseId;
    const questions = await questionService.findAllByCourseId(courseId);

    console.log(questions);

    return Response.json(questions);
}
