const initialState = {
    currentUser: null,
    token: null,
    admins: [],
    messages: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'LOGOUT':
            return initialState
        
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        
        case 'SET_ADMINS':
            return {
                ...state,
                admins: action.payload
            }

        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state
    }
}

export default reducer;
