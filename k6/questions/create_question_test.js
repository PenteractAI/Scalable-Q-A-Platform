import http from "k6/http";

export const options = {
    duration: "10s",
    vus: 10,
    summaryTrendStats: ["med", "p(99)"]
}

export default function () {
    const courseId = 1;

    const payload = JSON.stringify({
        title: "How to test performances?",
        content: "I need some examples on how tto test performances with K6.",
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    http.post(`http://localhost:7800/api/${courseId}/questions`, payload, params);
}