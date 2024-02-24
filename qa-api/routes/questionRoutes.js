import { handleGetQuestions, handleCreateQuestion } from "../handlers/questionHandlers.js";

export const questionRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions" }),
        fn: handleGetQuestions,
    },
    {
        method: "POST",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions" }),
        fn: handleCreateQuestion
    }
];