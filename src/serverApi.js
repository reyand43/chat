import io from "socket.io-client";

class serverApi {
  constructor() {
    this.socket = null;
    this.token = null;
  }

  connect = () => {
    this.socket = io();
  };

  auth = (name) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("add user", name, (res) => {
        return resolve(res);
      });
    });
  };

  joinRoom = (roomName, userName) => {
    return new Promise((resolve, reject) => {
      this.socket.emit("join room", { roomName, userName }, (res) => {
        return resolve(res);
      });
    });
  };

  changeRoom = (prevRoom, roomName, userName) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "change room",
        { prevRoom, nextRoom: roomName, userName },
        (res) => {
          return resolve(res);
        }
      );
    });
  };

  sendMessage = (roomName, text, userName) => {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime()
      this.socket.emit(
        "add message",
        {
          roomName,
          text,
          userName,
          timestamp
        },
        (res) => {
          return resolve(res);
        }
      );
    });
  };
}

const api = new serverApi();
export default api;
