import {cmdClient} from "./redis.js";

/**
 * Creates a proxy object that caches the results of method calls using Redis.
 * @param {Object} object - The object to wrap with caching functionality.
 * @param {string[]} methodsToFlushCacheWith - An array of method names that should flush the cache when called.
 * @returns {Object} - The proxied object with caching functionality.
 */
const cacheMethodCalls = (object, methodsToFlushCacheWith = []) => {
    const handler = {
        get: (module, methodName) => {
            const method = module[methodName];
            return async (...methodArgs) => {
                if (methodsToFlushCacheWith.includes(methodName)) {
                    await cmdClient.flushDb()
                    return await method.apply(this, methodArgs);
                }

                const cacheKey = `${methodName}-${JSON.stringify(methodArgs)}`;
                const cacheResult = await cmdClient.get(cacheKey);
                if (!cacheResult) {
                    const result = await method.apply(this, methodArgs);
                    await cmdClient.set(cacheKey, JSON.stringify(result));
                    return result;
                }

                return JSON.parse(cacheResult);
            };
        },
    };

    return new Proxy(object, handler);
};

export { cacheMethodCalls };