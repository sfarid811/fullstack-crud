import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    todos: [],
    getTodosStatus: "",
    getTodosError: "",
  };

  export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:8000/api/todos");
        console.log(response.data);
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
    reducers: {},
    [getTodos.pending]: (state, action) => {
        return {
          ...state,
          getTodosStatus: "pending",
          getTodosError: "",
        };
      },
      [getTodos.fulfilled]: (state, action) => {
        return {
          ...state,
          todos: action.payload,
          getTodosStatus: "success",
          getTodosError: "",
         
        };
      },
      [getTodos.rejected]: (state, action) => {
        return {
          ...state,
          getTodosStatus: "rejected",
          getTodosError: action.payload,
         
        };
      },

})


export default todoSlice.reducer;

export const selectTodo = (state) => state.todo.todos;
