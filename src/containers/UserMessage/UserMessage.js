import React from 'react'

import classes from "./UserMessage.module.scss";

const UserMessage = ({ text, userName, timestamp }) => {
  return (
    <div className={classes.UserMessage}>
        <span className={classes.UserMessage__UserName}>{userName}</span>
      <span className={classes.UserMessage__Text}>{text}</span>
      <span className={classes.UserMessage__TimeStamp}>{timestamp}</span>
    </div>
  );
};

export default UserMessage