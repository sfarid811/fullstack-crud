
import { useEffect } from 'react';
import {useDispatch, useSelector }from 'react-redux';
import {selectCount, increment, decrement} from './features/counterSlice';
import {getTodos, selectTodo} from './features/todoSlice';


const App = () => {

  const dispatch = useDispatch();

  const count = useSelector(selectCount);

  const todos  = useSelector(selectTodo);
  
  console.log(todos, 'saad');



useEffect(() => {
  dispatch(getTodos());
},[dispatch])


    const incrementCounter = () => {
      if(count < 10) dispatch(increment());
    }
    const decrementCounter = () => {
      if(count > 1) dispatch(decrement());
    }

    

  return (
    <div>
      <button onClick={decrementCounter}> decrement</button>
      <p>{count}</p>
      <button  onClick={incrementCounter}> increment </button>

      {todos.map((todo, index) => (
        <p key={index}>{todo.name}</p>
      ))}
      {todos.length === 0 && <div>... loading</div>}
     
    </div>
  );
}

export default App