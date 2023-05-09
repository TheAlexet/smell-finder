import { combineReducers } from 'redux'

import mainReducer from './reducers/mainSlice'

const rootReducer = combineReducers({
    main: mainReducer,
})

export default rootReducer