import { handleGetAnswers, handleUpvoteAnswer, handleCreateAnswer, handleRetrieveNewAnswers } from "../handlers/answerHandlers.js";

export const answerRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/questions/:questionId/answers"}),
        fn: handleGetAnswers,
    },
    {
        method: "POST",
        pattern: new URLPattern({ pathname: "/questions/:questionId/answers" }),
        fn: handleCreateAnswer
    },
    {
        method: "PUT",
        pattern: new URLPattern({ pathname: "/answers/:answerId/upvote"}),
        fn: handleUpvoteAnswer
    },
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/ws/questions/:questionId/answers"}),
        fn: handleRetrieveNewAnswers
    }
];