// useTaskData.js
import { useState, useEffect } from "react";

const useTaskData = () => {
  const [TaskData, setTaskData] = useState([]); // Data of tasks
  const [UserData, setUserData] = useState([]); // Data of users]

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        const { tickets, users } = data;
        setTaskData(tickets);
        setUserData(users);
      })
      .catch((error) =>
        console.error("Error encountered in fetching data", error)
      );
  }, []);

  // Filters by status
  const backlogTasks = TaskData.filter((task) => task.status === "Backlog");
  const ToDoTasks = TaskData.filter((task) => task.status === "Todo");
  const InProgressTasks = TaskData.filter(
    (task) => task.status === "In progress"
  );
  const DoneTasks = TaskData.filter((task) => task.status === "Done");
  const CancelledTasks = TaskData.filter((task) => task.status === "Cancelled");

  // Filters by priority
  const priority0 = TaskData.filter((task) => task.priority === 0);
  const priority1 = TaskData.filter((task) => task.priority === 1);
  const priority2 = TaskData.filter((task) => task.priority === 2);
  const priority3 = TaskData.filter((task) => task.priority === 3);
  const priority4 = TaskData.filter((task) => task.priority === 4);

  const priorityImages = {
    "1": "Img - Low Priority.svg",
    "2": "Img - Medium Priority.svg",
    "0": "No-priority.svg",
    "3": "Img - High Priority.svg",
    "4": "SVG - Urgent Priority grey.svg",
    "5": "SVG - Urgent Priority colour.svg",
  };

  // Return all the data and filters
  return {
    TaskData,
    UserData,
    backlogTasks,
    ToDoTasks,
    InProgressTasks,
    DoneTasks,
    CancelledTasks,
    priority0,
    priority1,
    priority2,
    priority3,
    priority4,
    priorityImages
  };
};

export default useTaskData;
