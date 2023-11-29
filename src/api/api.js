import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:90/api",
  timeout: 5000, // 요청 타임아웃 시간
  headers: {
    "Content-Type": "application/json",
    Origin: "http://localhost:3000", // 기타 필요한 헤더들 추가
  },
});
