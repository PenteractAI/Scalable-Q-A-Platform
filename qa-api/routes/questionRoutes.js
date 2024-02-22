import { handleGetQuestions } from "../handlers/questionHandlers.js";

export const questionRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions"}),
        fn: handleGetQuestions,
    },
];