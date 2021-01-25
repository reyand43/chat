import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import MyMessage from "../../containers/MyMessage/MyMessage";
import UserMessage from "../../containers/UserMessage/UserMessage";
import {
  changeRoom,
  removeRedirect,
  sendMessage,
} from "../../store/actions/rooms";
import classes from "./Chat.module.scss";
import ErrorPage from "../ErrorPage/ErrorPage";
import { joinRoom } from "../../store/actions/rooms";
import Loader from "../../containers/Loader/Loader";
import api from "../../serverApi";

function Chat() {
  const messagesRef = React.useRef(null);
  const roomsRef = React.useRef(null);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.name);
  const roomsState = useSelector((state) => state.rooms);
  const [inputRoomName, showInputRoomName] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [messageValue, setMessageValue] = useState("");

  React.useEffect(() => {
    if (roomsState.messages.length > 0 && !roomsState.joinLoading)
      messagesRef.current.scrollTo(0, 99999);
  }, [roomsState.messages]);

  React.useEffect(() => {
    if (roomsState.rooms.length > 0) roomsRef.current.scrollTo(0, 0, "smooth");
  }, [roomsState.rooms]);

  useEffect(() => {
    const roomName = document.location.pathname.slice(7);

    if (roomName !== "") {
      dispatch(joinRoom(roomName, userName));
    }
  }, []);

  let history = useHistory();

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return time;
  };

  return (
    <>
      {roomsState.joinError !== null ? (
        <ErrorPage
          onMainPage={() => {
            dispatch(removeRedirect());
          }}
        />
      ) : (
        <div className={classes.Chat}>
          <div className={classes.Chat__Rooms}>
            <form
              onSubmit={(evt) => {
                evt.preventDefault();

                history.replace(`/rooms/${roomName}`, roomName);

                roomName.trim() !== "" && api.socket.emit("add room", roomName);

                showInputRoomName(false);
                dispatch(joinRoom(roomName, userName));
                setRoomName("");
              }}
            >
              {inputRoomName ? (
                <>
                  <div>
                    <input
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Input room name"
                      pattern="^[a-zA-Z0-9]+$"
                    />

                    <button disabled={roomName === "" && inputRoomName}>
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                  <hr />
                </>
              ) : (
                <div>
                  <span>Rooms</span>

                  <button
                    onClick={(evt) => {
                      evt.preventDefault();
                      showInputRoomName(!inputRoomName);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              )}
            </form>
            <ul ref={roomsRef}>
              {!!roomsState.rooms &&
                roomsState.rooms.map((room) =>
                  room === roomsState.selectedRoom ? (
                    <li
                      className={classes.selected}
                      key={room}
                      onClick={() => {
                        dispatch(joinRoom(room, userName));
                      }}
                    >
                      <NavLink to={`/rooms/${room}`}>{room}</NavLink>
                    </li>
                  ) : (
                    <li
                      key={room}
                      onClick={() => {
                        dispatch(
                          changeRoom(room, userName, roomsState.selectedRoom)
                        );
                      }}
                    >
                      <NavLink to={`/rooms/${room}`}>{room}</NavLink>
                    </li>
                  )
                )}
            </ul>
          </div>

          <div className={classes.Chat__Messages}>
            {!!roomsState.selectedRoom === false ? (
              <div className={classes.Chat__Messages__Plug}>
                <i className="fas fa-comments"></i>
                <p>
                  <span onClick={() => showInputRoomName(true)}>
                    Create a new room
                  </span>{" "}
                  or choose one
                </p>
              </div>
            ) : (
              <>
                <div className={classes.Chat__Messages__RoomName}>
                  <span>Room: {roomsState.selectedRoom}</span>
                  <NavLink to={`/rooms/broadcast/${roomsState.selectedRoom}`}>
                    <i className="fas fa-video"></i>
                  </NavLink>
                </div>

                <div className={classes.Chat__Messages__MessageList}>
                  {roomsState.joinLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <ul ref={messagesRef}>
                        {roomsState.messages.length === 0 ? (
                          <div className={classes.Chat__Messages__NoMessages}>
                            <span>No messages yet</span>
                          </div>
                        ) : (
                          roomsState.messages.map((message, index) =>
                            message.userName === userName ? (
                              <li key={index} className="message">
                                <MyMessage
                                  text={message.text}
                                  timestamp={formatTime(message.timestamp)}
                                  loading={
                                    index === roomsState.messages.length - 1 &&
                                    roomsState.myMessageLoading
                                  }
                                />
                              </li>
                            ) : (
                              <li key={index} className="message">
                                <UserMessage
                                  text={message.text}
                                  userName={message.userName}
                                  timestamp={formatTime(message.timestamp)}
                                />
                              </li>
                            )
                          )
                        )}
                      </ul>
                      )
                    </>
                  )}
                </div>
                <form
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    messageValue.trim() !== "" &&
                      dispatch(
                        sendMessage(
                          roomsState.selectedRoom,
                          messageValue,
                          userName,
                          roomsState.messages
                        )
                      );
                    setMessageValue("");
                  }}
                >
                  <input
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                  ></input>
                  <button type="submit" disabled={messageValue.trim() === ""}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </>
            )}
          </div>
          {!!roomsState.selectedRoom && (
            <div className={classes.Chat__Users}>
              <span className={classes.Chat__Users__Title}>
                Users ({roomsState.users.length})
              </span>

              <ul>
                {roomsState.users.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
