import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../redux/slice/taskSlice";
import { useState } from "react";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [menuOpen, setMenuOpen] = useState(false);

  const saveEdit = () => {
    if (!title.trim()) return;
    dispatch(editTask({ id: task.id, title }));
    setEditing(false);
  };

  return (
    <div
      className="
        flex flex-wrap items-start justify-between gap-3
        rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        px-4 py-3
        shadow-sm hover:shadow-md transition
        relative
      "
    >
      {/* Task Title */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
            }}
            autoFocus
            className="
              w-full rounded-md border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              px-2 py-1 text-sm sm:text-base
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        ) : (
          <span
            className={`block text-sm sm:text-base leading-relaxed 
              break-words break-all whitespace-normal
              ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800 dark:text-gray-100"
              }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2">
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
        </div>

        {/* Mobile 3-Dot Menu */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Task actions"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="
                absolute right-12 top-10
                w-36 rounded-md border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900
                shadow-lg z-10 overflow-hidden
              "
            >
              <button
                onClick={() => {
                  dispatch(toggleTask(task.id));
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {task.completed ? "Mark as Pending" : "Mark as Done"}
              </button>

              <button
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Delete (All Screens) */}
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
