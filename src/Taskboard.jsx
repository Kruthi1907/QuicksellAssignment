import React, { useState, useEffect } from "react";
import "./Taskboard.css";
import Navbar from "./Navbar";
import Group from "./group";
import TaskCard from "./TaskCard";
import useTaskData from "./data";

const TaskBoard = () => {
  const {
    backlogTasks,
    ToDoTasks,
    InProgressTasks,
    DoneTasks,
    CancelledTasks,
  } = useTaskData();

  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "Status");
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering") || "Priority");

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  const handleGroupChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  // Combine all tasks into an array
  const allTasks = [
    ...backlogTasks,
    ...ToDoTasks,
    ...InProgressTasks,
    ...DoneTasks,
    ...CancelledTasks,
  ];

  // Grouping Logic
  let groupedTasks = {};
  if (grouping === "Status") {
    groupedTasks = {
      Backlog: backlogTasks,
      ToDo: ToDoTasks,
      InProgress: InProgressTasks,
      Done: DoneTasks,
      Cancelled: CancelledTasks,
    };
  } else if (grouping === "User") {
    groupedTasks = allTasks.reduce((acc, task) => {
      const userId = task.userId;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(task);
      return acc;
    }, {});
  } else if (grouping === "Priority") {
    groupedTasks = allTasks.reduce((acc, task) => {
      const priority = task.priority;
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(task);
      return acc;
    }, {});
  }

  // Ordering Logic
  const orderTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (ordering === "Title") {
        return a.title.localeCompare(b.title);
      } else if (ordering === "Priority") {
        return b.priority - a.priority; // Change to descending order
      }
      return 0;
    });
  };

  // Rendering grouped tasks
  return (
    <>
      <Navbar onGroupChange={handleGroupChange} onOrderChange={handleOrderChange} />
      <div className="task-board">
        {Object.entries(groupedTasks).map(([groupName, tasks]) => (
          <div className="column" key={groupName}>
            {/* Pass grouping type to the Group component */}
            <Group name={groupName} pic={`${groupName}.svg`} groupingType={grouping} />
            {orderTasks(tasks).map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
