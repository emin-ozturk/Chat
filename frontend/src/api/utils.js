import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' }
})

const makeRequest = async (type, path, body) => {
    try {
        const response = await instance[type](path, body);
        return { status: true, response };
    } catch (error) {
        console.log(error);
    }
}

export const login = (username, password) => {
    return makeRequest('post', 'login', {
        username,
        password
    })
}

