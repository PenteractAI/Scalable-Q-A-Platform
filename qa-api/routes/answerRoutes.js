import { handleGetAnswers, handleUpvoteAnswer } from "../handlers/answerHandlers.js";

export const answerRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions/:questionId/answers"}),
        fn: handleGetAnswers,
    },
    {
        method: "PUT",
        pattern: new URLPattern({ pathname: "/answers/:answerId/upvote"}),
        fn: handleUpvoteAnswer
    },
];