import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./redux/slice/taskSlice";
import { toggleTheme } from "./redux/slice/themeSlice";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.theme);

  useEffect(() => {
    // load tasks on app start
    dispatch(fetchTasks());

    if (theme === "dark") {
      //enable dark mode
      document.documentElement.classList.add("dark");
    } else {
      //disable dark mode
      document.documentElement.classList.remove("dark");
    }
  }, [theme, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight break-words sm:break-normal">
            Task Dashboard
          </h1>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Toggle Theme
          </button>
        </div>

        <AddTask />
        <Filters />
        <TaskList />
      </div>
    </div>
  );
}
