const initialState = {
    screen: "main",
    menuOpen: false
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'main/updateScreen':
            return {...state, screen: action.payload, menuOpen: false}

        case 'main/toggleMenu':
            return {...state, menuOpen: !state.menuOpen}

        default:
            return state
    }
}

export default mainReducer;