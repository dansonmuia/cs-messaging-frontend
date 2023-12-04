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