import CardItem from "./CardItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, selectTodo, reset } from "../features/todoSlice";
import Spinner from "./Spinner";
import TodoForm from "./TodoForm";
import toast from "react-hot-toast";


const Card = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const todoList = useSelector(selectTodo);

  const { todos, isLoading, isError, message } = todoList;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

   dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto container py-20 px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {todos && todos.length > 0 ? (
            todos.map((todo, index) => <CardItem key={index} todo={todo} />)
          ) : (
            <p className="text-center text-3xl text-slate-700">
              No tickets yet! Click on the bottom of the page
            </p>
          )}
        </div>
        
    
  
        <div className="fixed z-30 bottom-6 right-10 bg-gray-700 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
          <span className="text-[#fff]" onClick={() => setShowModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </div>

        {showModal && <TodoForm setShowModal={setShowModal} />}
      </div>
    </>
  );
};

export default Card;
