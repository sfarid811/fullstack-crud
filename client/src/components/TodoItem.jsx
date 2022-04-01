import React from 'react'
import {deleteTodo} from '../features/todoSlice';
import {useDispatch }from 'react-redux';

const TodoItem = ({todo}) => {
    const dispatch = useDispatch();
  return (
    <div className='goal' styles={{display: 'flex'}}>
    <h2>{todo.name}</h2>
    <button onClick={() => dispatch(deleteTodo(todo._id))} className='close'>
      X
    </button>
  </div>
  )
}

export default TodoItem