import { useState } from "react";
import { usePersonalTask } from "../hooks/usePersonalTask";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { Checkbox } from "@mui/material";
import grey from "@mui/material/colors/grey";
 

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
      // let sortedTasks;
      // if (Array.isArray(tasks)) {
      //   switch (sortOption) {
      //     case "deadline-low-high":
      //       sortedTasks = [json, ...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      //       break;
      //     case "deadline-high-low":
      //       sortedTasks = [json, ...tasks].sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
      //       break;
      //     case "date-recent":
      //       sortedTasks = [json, ...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      //       break;
      //     case "date-least-recent":
      //       sortedTasks = [json, ...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      //       break;
      //     default:
      //       sortedTasks = [json, ...tasks];
      //   }
      // } else {
      //   sortedTasks = [json];
      // }
      // setSortedTasks(sortedTasks);
      // console.log(sortedTasks);
    }
  };
  // console.log(deadline);
  return (
    <form className="create flex flex-col h-max bg-main-dark-bg border-1 border-border text-white p-4 rounded-2xl" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold text-center">Add a New Task</h1>
        <div className="h-10 mb-4">
            {/* <label className="flex items-center mr-4 text-xl col-span-2">Title:</label> */}
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            className={emptyFields.includes("title") ? "error" : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"}
            />
        </div>
        <div className="h-10 mb-4">
            {/* <label className="flex items-center mr-4 text-xl col-span-2">Description:</label> */}
            <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            className={emptyFields.includes("description") ? "error" : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"}
            />
        </div>
        <div className="h-10 mb-4">
            {/* <label className="flex items-center mr-4 text-xl col-span-2">Deadline:</label> */}
            <input
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            className={emptyFields.includes("deadline") ? "error" : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"}
            />
            
        </div>
        <div className="grid grid-cols-8 h-10 mb-8">
            <label className="flex items-center mr-4 text-xl col-span-2">Completed:</label>
            <div className="col-span-6 text-center p-2 text-zinc-200 rounded-xl">
              <Checkbox
                type="checkbox"
                checked={completed}
                sx={{color: grey[500],
                  '&.Mui-checked': {
                  color: grey[500],}}}
                size="large"
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </div>
        </div>

      <button className="mt-2 p-2 bg-secondary text-text rounded-md hover:bg-secondary/80 transition-colors">Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PersonalTaskForm;
