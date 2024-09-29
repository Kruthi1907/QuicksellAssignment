import React from "react";
import "./group.css";
import useTaskData from "./data";

const Group = ({ name, pic, groupingType, tasks = [] }) => {
  const count = tasks.length;
  const { userNames, priorityNames } = useTaskData(); // Ensure these are available in useTaskData

  const getGroupName = () => {
    if (groupingType === "User") {
      return `${userNames[name] || name} (${count})`; // Display user name and count
    } else if (groupingType === "Priority") {
      return `${priorityNames[name] || `Priority ${name}`} (${count})`; // Display priority name and count
    } else {
      return `${name} (${count})`; // Default for other grouping types
    }
  };

  return (
    <div className="head">
      <div className="left">
        <img src={pic} alt={name} />
        <span>{getGroupName()}</span>
      </div>
      <div className="right">
        <img src="add.svg" alt="add task" />
        <img src="3 dot menu.svg" alt="menu" />
      </div>
    </div>
  );
};

export default Group;
