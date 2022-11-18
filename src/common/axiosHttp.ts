import axios from "axios";
import { COMMON_API_URL } from "./constant";
const axiosHttp = axios.create({
    baseURL: COMMON_API_URL,
});

export default axiosHttp;
