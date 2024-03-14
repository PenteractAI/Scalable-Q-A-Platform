import http from "k6/http";

export const options = {
    duration: "10s",
    vus: 10,
    summaryTrendStats: ["med", "p(99)"]
}

export default function () {
    const questionId = 1;
    http.get(`http://localhost:7800/api/questions/${questionId}/answers`);
}