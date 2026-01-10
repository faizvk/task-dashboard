import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { list, filter, search } = useSelector((s) => s.tasks);

  const filtered = list.filter((task) => {
    //search by title
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") return task.completed && matchesSearch;
    if (filter === "pending") return !task.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="space-y-2 mt-4">
      {filtered.length === 0 && (
        <p className="text-sm text-gray-500 text-center">No tasks found</p>
      )}

      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
