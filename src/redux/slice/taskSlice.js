import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

//load tasks from localStorage
const loadTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

//save tasks to localStorage
const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

//async fetch(mock API)
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  return loadTasks();
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [], //task list
    filter: "all", //current filter
    search: "", //search text
    status: "idle", //fetch status
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.list.push(action.payload); //add task
        saveTasks(state.list);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(), //unique id
            title,
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      state.list = state.list.filter((t) => t.id !== action.payload); //remove task
      saveTasks(state.list);
    },
    toggleTask(state, action) {
      const task = state.list.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed; //toggle status
      saveTasks(state.list);
    },
    editTask(state, action) {
      const { id, title } = action.payload;
      const task = state.list.find((t) => t.id === id);
      if (task) task.title = title; //update title
      saveTasks(state.list);
    },
    setFilter(state, action) {
      state.filter = action.payload; //set filter
    },
    setSearch(state, action) {
      state.search = action.payload; //set search
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.list = action.payload; //load tasks
      state.status = "success";
    });
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
  setSearch,
} = taskSlice.actions;

export default taskSlice.reducer;
