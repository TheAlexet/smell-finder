const initialState = {
    screen: "home",
    csvSmells: null,
    csvFlaky: null
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'main/updateScreen':
            return {...state, screen: action.payload}

        case 'main/updateCsvSmells':
            return {...state, csvSmells: action.payload}

        case 'main/updateCsvFlaky':
            return {...state, csvFlaky: action.payload}

        default:
            return state
    }
}

export default mainReducer;