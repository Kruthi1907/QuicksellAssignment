// useTaskData.js
import { useState, useEffect } from "react";

const useTaskData = () => {
  const [TaskData, setTaskData] = useState([]); // Data of tasks
  const [UserData, setUserData] = useState([]); // Data of users

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

  const priorityImages = {
    0: "0.svg",
    1: "1.svg",
    2: "2.svg",
    3: "3.svg",
    4: "5.svg",
    5: "4.svg",
  };

  const priorityNames = {
    0: "No priotity",
    1: "Low priotity",
    2: "Medium priotity",
    3: "High priotity",
    4: "Urgent",
  }

  const userNames = UserData.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  // Return all the data and filters
  return {
    TaskData,
    UserData,
    backlogTasks,
    ToDoTasks,
    InProgressTasks,
    DoneTasks,
    CancelledTasks,
    priorityImages,
    userNames,
    priorityNames
  };
};

export default useTaskData;
