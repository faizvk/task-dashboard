import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice/taskSlice";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    //add task
    dispatch(addTask(title));
    //reset field
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
          flex-1 rounded-md border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          px-3 py-2 text-sm
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
        "
      />

      <button
        type="submit"
        className="
          inline-flex items-center justify-center
          rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
          hover:bg-blue-700 active:bg-blue-800
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      >
        Add
      </button>
    </form>
  );
}
