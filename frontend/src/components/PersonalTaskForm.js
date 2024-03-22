import { useState } from "react";
import { usePersonalTask } from "../hooks/usePersonalTask";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";

const PersonalTaskForm = ({ tasks, setSortedTasks, sortOption }) => {
  const { dispatch } = usePersonalTask();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(moment().format("YYYY-MM-DD"));
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add an task");
      return;
    }

    const task = { title, description, deadline, completed };

    const response = await fetch("/api/personalTasks/", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setDescription("");

      // Dispatch the action to create task
      dispatch({ type: "CREATE_TASK", payload: json });

      // Sort the tasks based on the current sort option
      let sortedTasks;
      if (Array.isArray(tasks)) {
        switch (sortOption) {
          case "deadline-low-high":
            sortedTasks = [json, ...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            break;
          case "deadline-high-low":
            sortedTasks = [json, ...tasks].sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
            break;
          case "date-recent":
            sortedTasks = [json, ...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case "date-least-recent":
            sortedTasks = [json, ...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          default:
            sortedTasks = [json, ...tasks];
        }
      } else {
        sortedTasks = [json];
      }
      setSortedTasks(sortedTasks);
    }
  };

  return (
    <form className="create flex flex-col h-72 bg-secondary-dark-bg text-white p-4 rounded-2xl" onSubmit={handleSubmit}>
        <h1 className="mb-2 text-xl font-bold text-center">Add a New Task</h1>
        <div className="grid grid-cols-5 h-10 mb-4">
            <label className="align-middle mr-4 text-xl">Title:</label>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-5 h-10 mb-4">
            <label className="align-middle mr-4 text-xl">Description:</label>
            <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-5 h-10 mb-4">
            <label className="align-middle mr-4 text-xl">Deadline:</label>
            <input
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            className={emptyFields.includes("deadline") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-5 h-10 mb-4">
            <label className="align-middle mr-4 text-xl">Completed:</label>
            <input
            type="checkbox"
            onChange={(e) => setCompleted(e.target.checked)}
            value={completed}
            className={emptyFields.includes("completed") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>

      <button className="mt-2 p-2 bg-accent text-zinc-800 rounded-2xl">Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PersonalTaskForm;
