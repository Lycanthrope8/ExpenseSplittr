import { useState, useContext } from "react";
import { useHomeTask } from "../hooks/useHomeTask";
import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileContext } from "../context/ProfileContext";
import moment from "moment";
import { Checkbox } from "@mui/material";
import yellow from "@mui/material/colors/yellow";

const HomeTaskForm = ({ tasks, setSortedTasks, sortOption }) => {
  const { dispatch } = useHomeTask();
  const { user } = useAuthContext();
  const { profile } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(moment().format("YYYY-MM-DD"));
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a task");
      return;
    }

    const task = { title, description, deadline, completed, home_id: profile.homeId, user_id: user.id};
    console.log(task);
    const response = await fetch("/api/homeTasks/", {
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
    }
  };

  return (
    <form className="create flex flex-col h-max bg-main-dark-bg border-1 border-border text-white p-4 rounded-2xl" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold text-center">Add a New Task</h1>
        <div className="grid grid-cols-8 h-10 mb-4">
            <label className="flex items-center mr-4 text-xl col-span-2">Title:</label>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : "col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-8 h-10 mb-4">
            <label className="flex items-center mr-4 text-xl col-span-2">Description:</label>
            <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : "col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-8 h-10 mb-4">
            <label className="flex items-center mr-4 text-xl col-span-2">Deadline:</label>
            <input
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            className={emptyFields.includes("deadline") ? "error" : "col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
            />
        </div>
        <div className="grid grid-cols-8 h-10 mb-8">
            <label className="flex items-center mr-4 text-xl col-span-2">Completed:</label>
            <div className="col-span-6 text-center p-2 text-zinc-200 rounded-xl">
              <Checkbox
                type="checkbox"
                checked={completed}
                sx={{color: yellow[300],
                  '&.Mui-checked': {
                  color: yellow[300],}}}
                size="large"
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </div>
        </div>

      <button className="mt-2 p-2 bg-accent text-zinc-800 rounded-2xl">Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default HomeTaskForm;