const initialState = {
    screen: "home",
    csvSmells: null,
    csvFlaky: null,
    csvFlakyDownloaded: null,
    csvResults: null,
    tableResults: [],
    hiddenTable: false
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'main/updateScreen':
            return {...state, screen: action.payload}

        case 'main/updateCsvSmells':
            return {...state, csvSmells: action.payload}

        case 'main/updateCsvFlaky':
            return {...state, csvFlaky: action.payload}

        case 'main/updateCsvFlakyDownloaded':
            return {...state, csvFlakyDownloaded: action.payload}

        case 'main/updateCsvResults':
            return {...state, csvResults: action.payload}

        case 'main/updateTableResults':
            return {...state, tableResults: action.payload}

        case 'main/updateHiddenTable':
            return {...state, hiddenTable: action.payload}

        default:
            return state
    }
}

export default mainReducer;