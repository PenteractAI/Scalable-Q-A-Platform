import { serve } from "./deps.js";
import { courseRoutes } from "./routes/courseRoutes.js";

const router = [...courseRoutes];

/**
 * Handles the incoming request and routes it to the appropriate function based on the URL mapping.
 *
 * @param {Object} request - The incoming request object.
 * @returns {Promise<Object>} - A promise that resolves with the response object.
 */
const handleRequest = async (request) => {
    const mapping = router.find(
        (um) => um.method === request.method && um.pattern.test(request.url)
    );

    if(!mapping) {
        return new Response('Not found', { status: 404 });
    }

    const mappingResult = mapping.pattern.exec(request.url);
    try {
        return await mapping.fn(request, mappingResult);
    } catch (e) {
        console.log(e);
        return new Response(e.stack, { status: 500 })
    }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
