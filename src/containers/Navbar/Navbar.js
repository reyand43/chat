import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setMessages, setRoomUsers, setSelectedRoom } from "../../store/actions/rooms";
import classes from "./Navbar.module.scss";

const Navbar = () => {
  const username = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__Wrapper}>
        <span className={classes.Navbar__Wrapper__Logo}>
          <NavLink
            onClick={() => {
              dispatch(setRoomUsers([]));
              dispatch(setMessages([]));
              dispatch(setSelectedRoom(""));
            }}
            to={"/rooms"}
          >
            Fora Chat
          </NavLink>
        </span>
        <span className={classes.Navbar__Wrapper__Name}>
          Hi, {username.name}!
        </span>
      </div>
    </div>
  );
};

export default Navbar;
