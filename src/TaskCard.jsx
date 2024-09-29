import React from "react";
import useUserData from "./data";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { UserData, priorityImages } = useUserData();
  const user = UserData.find((user) => user.id === task.userId);
  return (
    <div className="task-card">
      <div className="header">
        <p>{task.id} </p>
        <span className="profile">{user ? user.name.charAt(0) : "U"}</span>
      </div>
      <p style={{ fontWeight: "bold", color: "black" }}>{task.title} </p>
      <div className="bottom">
        <img src={priorityImages[task.priority]}></img>
        <p style={{display: "flex", alignItems: "center", gap: "0.3vw"}}><div className="dot"></div>{task.tag}</p>
      </div>
    </div>
  );
};

export default TaskCard;
