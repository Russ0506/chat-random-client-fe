import { combineReducers } from "redux";
import loadingReducer from './LoadingReducer';
import changeState from './changeState'

const rootReducer = combineReducers({
    loadingReducer,
    changeState
})

export default rootReducer;