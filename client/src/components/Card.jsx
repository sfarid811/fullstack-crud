
import CardItem from "./CardItem";
import { useEffect } from 'react';
import {useDispatch, useSelector }from 'react-redux';
import {getTodos, selectTodo, reset} from '../features/todoSlice';
import Spinner from './Spinner';



const Card = () => {

    const dispatch = useDispatch();

    const todoList = useSelector(selectTodo);
  
    const { todos, isLoading, isError, message } = todoList;


    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        dispatch(getTodos())
    
        return () => {
          dispatch(reset())
        }
      }, [isError, message, dispatch])
    
    if (isLoading) {
      return <Spinner />
    }
  
  return (
      <>
        <div className="mx-auto container py-20 px-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {todos && todos.map((todo, index) => (
                 <CardItem key={index} todo={todo} />
          ))}  
        </div>
  
    </div>

      </>
  

  );
};

export default Card;
