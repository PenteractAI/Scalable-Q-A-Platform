import http from "k6/http";
import {group} from 'k6';

export const options = {
    duration: "10s",
    vus: 10,
    summaryTrendStats: ["med", "p(99)"]
}

export default function () {
    const questionId = 1;

    const payload = JSON.stringify({
        content: "I need some examples on how tto test performances with K6.",
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    http.post(`http://localhost:7800/api/${questionId}/answers`, payload, params);
}