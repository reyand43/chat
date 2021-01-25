import {
  JOIN_ERROR,
  JOIN_START,
  JOIN_SUCCESS,
  MY_MESSAGE_LOADING,
  REMOVE_REDIRECT,
  SEND_SUCCESS,
  SET_MESSAGES,
  SET_ROOMS,
  SET_ROOM_USERS,
  SET_SELECTED_ROOM,
} from "../actions/actionTypes";

const initialState = {
  rooms: [],
  joinError: null,
  selectedRoom: "",
  joinLoading: false,
  users: [],
  messages: [],
  myMessageLoading: false
};

export default function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_START:
      return {
        ...state,
        joinLoading: true,
      };
    case JOIN_ERROR:
      return {
        ...state,
        joinError: action.error,
        joinLoading: false,
      };
    case REMOVE_REDIRECT:
      return {
        ...state,
        joinError: null,
        joinLoading: false,
      };

    case JOIN_SUCCESS:
      return {
        ...state,
        joinError: null,
        selectedRoom: action.roomName,
        joinLoading: false,
      };
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.roomName,
      };

    case SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      };
    case SET_ROOM_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case MY_MESSAGE_LOADING:
      return{
        ...state,
        myMessageLoading: true
      }
    case SEND_SUCCESS:
      return{
        ...state,
        myMessageLoading: false
      }

    default:
      return state;
  }
}
