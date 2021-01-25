import api from "../../serverApi";
import {
  JOIN_ERROR,
  JOIN_START,
  JOIN_SUCCESS,
  REMOVE_REDIRECT,
  SET_ROOM_USERS,
  SET_SELECTED_ROOM,
  SEND_ERROR,
  SEND_SUCCESS,
  SET_MESSAGES,
  MY_MESSAGE_LOADING,
} from "./actionTypes";

export function joinRoom(roomName, userName) {
  return async (dispatch) => {
    dispatch(joinStart());
    api.socket.removeAllListeners("user added to room");
    api.socket.removeAllListeners("message list");
    api.socket.on("user added to room", (users) => {
      dispatch(setRoomUsers(users.users));
    });
    api.socket.on("message list", (messages) => {
      dispatch(setMessages(messages.messages));
    });
    const res = await api.joinRoom(roomName, userName);

    if (res.status === "error") dispatch(joinError(res.data));
    else {
      dispatch(joinSuccess(roomName));
    }
  };
}

export function changeRoom(roomName, userName, prevRoom) {
  return async (dispatch) => {
    dispatch(setMessages([]));
    dispatch(setRoomUsers([]));
    if (!!prevRoom === true) {
      dispatch(joinStart());

      const res = await api.changeRoom(prevRoom, roomName, userName);
      api.socket.removeAllListeners("user added to room");
      api.socket.removeAllListeners("message list");
      api.socket.on("user added to room", (users) => {
        dispatch(setRoomUsers(users.users));
      });
      api.socket.on("message list", (messages) => {
        dispatch(setMessages(messages.messages));
      });

      if (res.status === "error") dispatch(joinError(res.data));
      else {
        dispatch(joinSuccess(roomName));
        
      }
      
    } else dispatch(joinRoom(roomName, userName));
  };
}

export function setSelectedRoom(roomName) {
  return {
    type: SET_SELECTED_ROOM,
    roomName,
  };
}

export function setRoomUsers(users) {
  return {
    type: SET_ROOM_USERS,
    users,
  };
}

function joinStart() {
  return {
    type: JOIN_START,
  };
}

function joinError(error) {
  return {
    type: JOIN_ERROR,
    error,
  };
}

function joinSuccess(roomName) {
  return {
    type: JOIN_SUCCESS,
    roomName,
  };
}

export function removeRedirect() {
  return {
    type: REMOVE_REDIRECT,
  };
}



export function sendMessage(roomName, text, userName, messages) {
  return async (dispatch) => {

    const messageList = [...messages];
    const timestamp = new Date().getTime();
    messageList.push({ text: text, userName: userName, timestamp: timestamp });
    dispatch(myMessageLoading())
    dispatch(setMessages(messageList));
    const res = await api.sendMessage(roomName, text, userName);
    if (res === "error") dispatch(sendError(res.data));
    else {
      dispatch(sendSuccess());

    }
  };
}

function myMessageLoading() {
  return{
    type: MY_MESSAGE_LOADING,
   
  }
}

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  };
}

function sendError(error) {
  return {
    type: SEND_ERROR,
    error,
  };
}

function sendSuccess(roomName) {
  return {
    type: SEND_SUCCESS,
    roomName,
  };
}
