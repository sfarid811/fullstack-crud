import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  todos : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message : ''
  };


  export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API);
     
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
      }
    }
  );



  export const createTodo = createAsyncThunk(
    "todos/todosAdd",
    async (todo, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:8000/api/todos/create", todo);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
      }
    }
  );

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true;
     
    },
    [getTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [getTodos.rejected]: (state, { payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
    },
    [createTodo.pending] : (state) => {
      state.isLoading = true
    }, 
    [createTodo.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.todos.push(payload)
    },
    [createTodo.failed]: (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
    }
    
  },
})


export default todoSlice.reducer;

export const selectTodo = (state) => state.todo.todos;
