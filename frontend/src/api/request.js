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
    return makeRequest('get', `message/${channelID}`);
}

export const getCurrentUser = () => {
    return makeRequest('get', 'user/current-user')
}

export const getCheckUser = (userName) => {
    return makeRequest('get', `user/check-user/${userName}`)
}

export const createChannel = (channelName, channelDesc, userIDs) => {
    return makeRequest('post', 'channel/create-channel', {
        name: channelName,
        description: channelDesc,
        userID: userIDs
    })
} 
