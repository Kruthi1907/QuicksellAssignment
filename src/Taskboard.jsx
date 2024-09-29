import React, { useEffect, useState } from "react";
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
    CancelledTasks
  } = useTaskData();

  return (
    <>
      <Navbar />
      <div className="task-board">
        <div className="column">
          <Group name="Backlog" pic="Backlog.svg" />
          {backlogTasks.map(task => (
            <TaskCard task ={task}/>
          ))}
        </div>
        <div className="column">
          <Group name="ToDo" pic = "To-Do.svg" />
          {ToDoTasks.map(task => (
            <TaskCard task={task} />
          ))}
        </div>
        <div className="column">
          <Group name="In Progress" pic = "in-progress.svg" />
          {InProgressTasks.map(task => (
            <TaskCard task={task}/>
          ))}
        </div>
        <div className="column">
          <Group name="Done" pic = "Done.svg"/>
          {DoneTasks.map(task => (
            <TaskCard task={task} />
          ))}
        </div>
        <div className="column">
          <Group name="Cancelled" pic = "Cancelled.svg" />
          {CancelledTasks.map(task => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TaskBoard;
