import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../store/actions/auth";
import classes from "./Auth.module.scss";

function Auth() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  return (
    <div className={classes.Auth}>
      <span className={classes.Auth__Title}>Fora Chat</span>
      <form>
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={userName}
          pattern="[a-zA-Z0-9]+"
          onChange={(e) => setUserName(e.target.value)}
        />
        {authState.authError && (
          <span className={classes.Auth__Error}>{authState.authError}</span>
        )}
        <button
          disabled={authState.authLoading}
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(auth(userName));
          }}
        >
          {authState.authLoading ? "Загрузка" : "Войти в чат"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
