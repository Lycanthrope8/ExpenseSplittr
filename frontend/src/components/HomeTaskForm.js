import { useState, useContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { useHomeTask } from "../hooks/useHomeTask";
import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileContext } from "../context/ProfileContext";
import moment from "moment";
import { Checkbox } from "@mui/material";
import grey from "@mui/material/colors/grey";

const HomeTaskForm = ({ tasks, setSortedTasks, sortOption, homeMembers }) => {
  const { dispatch } = useHomeTask();
  const { user } = useAuthContext();
  const { profile } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(moment().format("YYYY-MM-DD"));
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const members = homeMembers.map((e, index) => ({
    id: e.name,
    display: e.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a task");
      return;
    }

    const task = {
      title,
      description,
      deadline,
      completed,
      home_id: profile.homeId,
      user_id: user.id,
    };
    console.log(task);
    const response = await fetch("/api/homeTasks/", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
  // console.log(title.match(/[A-Za-z0-9]*@?\w+/g));
  console.log(title.match(/[^(]+(?=\))/g));
  return (
    <form
      className="create flex flex-col h-max bg-main-dark-bg border-1 border-border text-white p-4 rounded-2xl"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-xl font-bold text-center">Add a New Task</h1>
      <div className="h-10 mb-4">
        {/* <label className="flex items-center mr-4 text-xl col-span-2">Title:</label> */}
        {/* <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          className={
            emptyFields.includes("title")
              ? "error"
              : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"
          }
        /> */}
        <div>
          <MentionsInput
            singleLine
            type="text"
            value={title}
            placeholder="Title @..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{
              control: {
                backgroundColor: "transparent",
              },

              "&multiLine": {
                control: {
                  fontFamily: "monospace",
                  minHeight: 63,
                },
                highlighter: {
                  padding: 9,
                  border: "1px solid transparent",
                },
                input: {
                  padding: 9,
                  border: "1px solid silver",
                },
              },

              "&singleLine": {
                display: "inline-block",
                width: "100%",

                highlighter: {
                  padding: 2,
                  border: "none",
                },
                input: {
                  padding: 8,
                  border: "1px solid hsl(240, 3.7%, 15.9%)",
                  borderRadius: 6,
                },
              },

              suggestions: {
                list: {
                  backgroundColor: "hsl(240 3.7% 15.9%)",
                  border: "1px solid rgba(0,0,0,0.15)",
                },
                item: {
                  padding: "5px 15px",
                  borderBottom: "1px solid rgba(0,0,0,0.15)",
                  "&focused": {
                    backgroundColor: "rgba(240, 240, 240, 0.8)",
                    color: "hsl(240 3.7% 15.9%)",
                  },
                },
              },
            }}
          >
            <Mention trigger="@" data={members} />
          </MentionsInput>
        </div>
      </div>
      <div className="h-10 mb-4">
        {/* <label className="flex items-center mr-4 text-xl col-span-2">Description:</label> */}
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          className={
            emptyFields.includes("description")
              ? "error"
              : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"
          }
        />
      </div>
      <div className="h-10 mb-4">
        {/* <label className="flex items-center mr-4 text-xl col-span-2">Deadline:</label> */}
        <input
          type="date"
          onChange={(e) => setDeadline(e.target.value)}
          value={deadline}
          className={
            emptyFields.includes("deadline")
              ? "error"
              : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"
          }
        />
      </div>
      <div className="grid grid-cols-8 h-10 mb-8">
        <label className="flex items-center mx-2 text-lg text-text">
          Completed:
        </label>
        <div className="col-span-6 text-center p-2 text-zinc-200 rounded-xl">
          <Checkbox
            type="checkbox"
            checked={completed}
            sx={{
              color: grey[500],
              "&.Mui-checked": {
                color: grey[500],
              },
            }}
            size="large"
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
      </div>

      <button className="mt-2 p-2 bg-secondary text-text rounded-md hover:bg-secondary/80 transition-colors">
        Add Task
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default HomeTaskForm;
