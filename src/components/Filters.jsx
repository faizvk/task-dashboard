import { useDispatch } from "react-redux";
import { setFilter, setSearch } from "../redux/slice/taskSlice";

export default function Filters() {
  const dispatch = useDispatch();

  const baseBtn =
    "px-3 py-1.5 rounded-md text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`${baseBtn} border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800`}
        >
          All
        </button>

        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={`${baseBtn} border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800`}
        >
          Completed
        </button>

        <button
          onClick={() => dispatch(setFilter("pending"))}
          className={`${baseBtn} border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800`}
        >
          Pending
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="
          ml-auto w-full sm:w-48
          rounded-md border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          px-3 py-1.5 text-sm
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
        "
      />
    </div>
  );
}
