import axios from "axios";
import { getToken } from '../token'


const token = await getToken();
const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json', 'authorization': `Bearer ${token}`}
})

export const makeRequest = async (type, path, body) => {
    try {
        const token = await getToken();
        const headers = {
            'authorization': `Bearer ${token}`
        };

        const response = await instance[type](path, { ...body, headers });
        return response;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}


