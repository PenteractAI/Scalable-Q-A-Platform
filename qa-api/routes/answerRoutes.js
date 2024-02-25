import { handleGetAnswers } from "../handlers/answerHandlers.js";

export const answerRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions/:questionId/answers"}),
        fn: handleGetAnswers,
    },
];