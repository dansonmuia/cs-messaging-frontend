export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})

export const setToken = token => ({
    type: 'SET_TOKEN',
    payload: token
})

export const logout = () => ({
    type: 'LOGOUT'
})

export const setAdmins = admins => ({
    type: 'SET_ADMINS',
    payload: admins
})

export const setMessages = messages => ({
    type: 'SET_MESSAGES',
    payload: messages
})

export const setAssignedMessages = messages => ({
    type: 'SET_ASSIGNED_MESSAGES',
    payload: messages
})
