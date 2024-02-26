import { handleGetAnswers, handleUpvoteAnswer, handleCreateAnswer } from "../handlers/answerHandlers.js";;

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
];