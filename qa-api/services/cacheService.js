import redisClient from "../utils/redisClient.js";

/**
 * Builds a key for Redis from the user UUID and type of content
 *
 * @param {string} userUuid - The UUID of the user.
 * @param {string} type - Type of content (answer, question)
 * @returns {string} The submission key for grading.
 */
const buildSubmissionKey = (userUuid, type) => {
    return `user:${userUuid}:${type}`;
}

/**
 * Check if the user can publish a new content depending on its type
 *
 * @param userUuid
 * @param type
 * @returns {Promise<boolean>}
 */
export const canPost = async (userUuid, type) => {
    const key = buildSubmissionKey(userUuid, type);
    const exists = await redisClient.get(key);
    if(exists) {
        const ttl = await redisClient.ttl(key);
        console.log(`User ${userUuid} tried to add a new ${type} too early. Remaining TTL: ${ttl}s.`);
    }
    return !exists;
}

/**
 * Store in Redis a new entry for a user and a type of content with a specific TTL
 *
 * @param userUuid
 * @param type
 * @param ttl
 * @returns {Promise<void>}
 */
export const storeWithTTL = async (userUuid, type, ttl) => {
    const key = buildSubmissionKey(userUuid, type);
    await redisClient.set(key, 'true', {EX: ttl });
}