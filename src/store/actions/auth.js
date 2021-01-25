import api from "../../serverApi";
import { AUTH_ERROR, AUTH_SUCCESS, AUTH_START, SET_ROOMS } from "./actionTypes";

export function auth(name) {
  return async (dispatch) => {
    dispatch(authStart());
    const re = new RegExp("^[a-zA-Z0-9]+$")
    if (!re.test(name)){
      dispatch(authError("Only latin letters available"));
      return
    }
    if (name === "") {
      dispatch(authError("Input real name"));
    } else {
      const res = await api.auth(name);
      if (res.status === "error") dispatch(authError("Such user already exist"));
      else {
        dispatch(authSuccess(name));
        api.socket.on("room added", (rooms) => {
          dispatch(setRooms(rooms.rooms));
        });
      }
    }
  };
}

function authStart() {
  return { type: AUTH_START };
}

function authSuccess(name) {
  return {
    type: AUTH_SUCCESS,
    name,
  };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}

export function setRooms(rooms) {
  return {
    type: SET_ROOMS,
    rooms,
  };
}
