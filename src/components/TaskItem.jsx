import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../redux/slice/taskSlice";
import { useState } from "react";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    if (!title.trim()) return; // ignore empty
    dispatch(editTask({ id: task.id, title }));
    setEditing(false);
  };

  return (
    <div
      className="
        flex items-center justify-between gap-3
        rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        px-4 py-3
        shadow-sm hover:shadow-md transition
      "
    >
      <div className="flex-1">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveEdit} // save on blur
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(); // save on Enter
            }}
            autoFocus
            className="
              w-full rounded-md border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              px-2 py-1 text-sm
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        ) : (
          <span
            className={`text-sm ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleTask(task.id))}
          className="rounded-md px-2 py-1 text-xs font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {task.completed ? "Pending" : "Done"}
        </button>

        <button
          onClick={() => setEditing(true)}
          className="rounded-md px-2 py-1 text-xs font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Edit
        </button>

        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
