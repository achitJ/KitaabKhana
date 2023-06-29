import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URI}/api`,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
});

export default instance;