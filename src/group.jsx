import React from "react";
import "./group.css"

const Group = ({ name, pic, tasks = [] }) => {
  const count = tasks.length;
  return (
    <div className="head">
      <div className="left">
        <img src={pic} />
        <span>
          {name} {count}
        </span>
      </div>
      <div className="right">
        <img src={"add.svg"} />
        <img src="3 dot menu.svg" />
      </div>
    </div>
  );
};

export default Group;
