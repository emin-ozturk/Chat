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

export const getChannel = () => {
    return makeRequest('get', 'channel')
}

export const getChannelMessages = (channelID) => {
    return makeRequest('get', 'message', {
        channelID,
    })
}

export const getCurrentUserID = () => {
    return makeRequest('get', 'user/current-user-id')
}

export const sendMessage = (channelID, message) => {
    return makeRequest('post', 'message/create-message', {
        channelID,
        content: message
    })
}
