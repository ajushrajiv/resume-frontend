import axios from 'axios';

const api = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_API_HOST}/v1`
});

console.log("public api",process.env.NEXT_PUBLIC_API_HOST )
export default api;
