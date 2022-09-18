import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todoSlice";
import toast from 'react-hot-toast';


const TodoForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      toast.error('Enter a task before adding', {
        duration: 4000,
        position: 'top-right',
      })
      return;
    }
    dispatch(createTodo({ name, description }));
    setName("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white shadow-xl">
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold">Add your task</h2>
              <p className="my-4 opacity-70">
              Please fill in the fields below !
              </p>
              <hr className="my-6" />
              <label className="uppercase text-sm font-bold opacity-70">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Give your ticket a name"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:outline-none"
              />
              <label className="uppercase text-sm font-bold opacity-70">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Give your ticket a description"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded
                border-slate-200 focus:outline-none
                "
              />

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="py-3 px-6 my-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
                >
                  Add
                  </button>
                <button
                  type="button"
                  className="py-3 px-6 my-2 bg-emerald-500 text-white font-medium rounded cursor-pointer ease-in-out duration-300"
                  onClick={() => setShowModal(false)}
                >
                 Cancel
                  </button>
              </div>
            </form>
          </div>
        </div>
        <div className=""
         onClick={() => setShowModal(false)}
        >

        </div>

      </div>
    </div>
  );
};

export default TodoForm;
