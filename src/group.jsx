import React from "react";
import "./group.css"

const Group = ({ name, pic, tasks = [] }) => {
  const count = tasks.length;
  return (
    <div className="head">
      <div className="left">
        <img src={pic} alt="none"/>
        <span>
          {name} {count}
        </span>
      </div>
      <div className="right">
        <img src={"add.svg"} alt="none"/>
        <img src="3 dot menu.svg" alt="none"/>
      </div>
    </div>
  );
};

export default Group;
