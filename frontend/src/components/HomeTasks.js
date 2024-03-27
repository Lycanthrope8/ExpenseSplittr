import React, { useState, useEffect } from "react";
import { useHomeTask } from "../hooks/useHomeTask";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskDetails from "./HomeTaskDetails";
import HomeTaskForm from "./HomeTaskForm";
import SortButton from "./SortButton";
import { useProfileContext } from "../hooks/useProfileContext";

export const HomeTasks = () => {
  const { tasks, dispatch } = useHomeTask();
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortOption, setSortOption] = useState("date-recent");
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/homeTasks/${profile.homeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [dispatch, user, sortOption]);
  
  const handleEdit = (editedTask) => {
    const updatedSortedTasks = sortedTasks.map((task) =>
      task._id === editedTask._id ? editedTask : task
    );
    setSortedTasks(updatedSortedTasks);
  }; 

  const handleDelete = (deletedTaskId) => {
    // Filter out the deleted task from sortedTasks
    const updatedSortedTasks = sortedTasks.filter(
      (task) => task._id !== deletedTaskId
    );
    setSortedTasks(updatedSortedTasks);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted;
    switch (option) {
      case "deadline-low-high":
        sorted = tasks.slice().sort((a, b) => a.deadline - b.deadline);
        break;
      case "deadline-high-low":
        sorted = tasks.slice().sort((a, b) => b.deadline - a.deadline);
        break;
      case "date-recent":
        sorted = tasks
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        break;
      case "date-least-recent":
        sorted = tasks
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        break;
      default:
        sorted = tasks;
    }
    setSortedTasks(sorted);
    console.log(sorted);
  };
  return (
    <div className="home grid grid-cols-3 gap-4 mx-4">
      <div className="col-span-2 relative">
        <SortButton onSort={handleSort} />
        <div>
          {sortedTasks && sortedTasks.length > 0
            ? sortedTasks.map((task) => (
                <div className="task-details-wrapper" key={task._id}>
                  <TaskDetails task={task} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
              ))
            : tasks &&
              tasks.map((task) => (
                <div className="task-details-wrapper" key={task._id}>
                  <TaskDetails task={task} />
                </div>
              ))}
        </div>
      </div>
      <HomeTaskForm tasks={tasks} setSortedTasks={setSortedTasks} />

    </div>
  );
};
