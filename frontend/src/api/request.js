import { makeRequest } from "./utils"

export const login = (username, password) => {
    return makeRequest('post', 'login', {
        username,
        password
    })
}

export const signup = (user) => {
    return makeRequest('post', 'signup', user)
}
