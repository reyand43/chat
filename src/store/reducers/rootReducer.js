import { combineReducers } from 'redux'
import authReducer from './auth'
import roomsReducer from './rooms'

export default combineReducers({
    auth: authReducer,
    rooms: roomsReducer
})