import counterReducer from './counter_reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    count:counterReducer
})