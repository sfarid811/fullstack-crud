
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getTodos = createAsyncThunk(
  "todos/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/todos");

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/create",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/todos/create",
        todo
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // ``
      return await axios.delete("http://localhost:8000/api/todos/" + id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (todo, { rejectWithValue }) => {
    try {
      const { id, name, description } = todo;

      const response = await axios.put(
        `http://localhost:8000/api/todos/${id}`,
        {
          name,
          description,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
        toast.success("Ticket created Successfully", {
          duration: 4000,
          position: 'top-right',
        });
       
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.error.message, {
          duration: 4000,
          position: 'top-right',
        })
      })
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload
        );
        state.todos.splice(index, 1);
        toast.success('ticket deleted successfully!', {
          duration: 4000,
          position: 'top-right',
        })
      })
     
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updateTodo = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
        state.todos = updateTodo;
        toast.success("ticket information updated", {
          duration: 4000,
          position: 'top-right',
        })
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;

export const selectTodo = (state) => state.todo;
