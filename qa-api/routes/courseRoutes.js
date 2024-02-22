import { handleGetCourses } from "../handlers/courseHandlers.js";

export const courseRoutes = [
    {
        method: "GET",
        pattern: new URLPattern({ pathname: "/courses"}),
        fn: handleGetCourses,
    },
];