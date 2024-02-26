import {
    handleGetQuestion,
    handleGetQuestions,
    handleCreateQuestion,
    handleUpvoteQuestion
} from "../handlers/questionHandlers.js";

export const questionRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions/:questionId"}),
        fn: handleGetQuestion
    },
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions" }),
        fn: handleGetQuestions,
    },
    {
        method: "POST",
        pattern: new URLPattern({ pathname: "/courses/:courseId/questions" }),
        fn: handleCreateQuestion
    },
    {
        method: "PUT",
        pattern: new URLPattern({ pathname: "/questions/:questionId/upvote"}),
        fn: handleUpvoteQuestion
    }
];