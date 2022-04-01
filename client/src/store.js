import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import counterReducer from './features/counterSlice';
import todoReducer from './features/todoSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo : todoReducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
})


