import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../redux/slice/taskSlice";
import TaskList from "../components/TaskList";

test("renders task from store", () => {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: {
      tasks: {
        list: [{ id: "1", title: "Test Task", completed: false }],
        filter: "all",
        search: "",
        status: "idle",
      },
    },
  });

  render(
    <Provider store={store}>
      <TaskList />
    </Provider>
  );

  expect(screen.getByText("Test Task")).toBeInTheDocument();
});
