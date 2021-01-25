import React from "react";
import SmallLoader from "../Loader/SmallLoader";
import classes from "./MyMessage.module.scss";

const MyMessage = ({ text, timestamp, loading }) => {
  return (
    <>
    <div className={classes.MyMessage}>
      {loading &&
      <div className={classes.MyMessage__Loader}>
        <SmallLoader/>
      </div>}
      <span className={classes.MyMessage__Text}>{text}</span>
      <span className={classes.MyMessage__TimeStamp}>{timestamp}</span>
    </div>
    </>
  );
};

export default MyMessage