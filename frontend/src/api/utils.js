import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' }
})

export const makeRequest = async (type, path, body) => {
    try {
        const response = await instance[type](path, body);
        return response;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}


