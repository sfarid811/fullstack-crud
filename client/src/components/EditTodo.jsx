import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../features/todoSlice";

const EditTodo = ({ setShowEdit, todo }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const updateForm = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo({ id: todo._id, name: name, description: description })
    );
    setShowEdit(false);
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white shadow-xl">
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={updateForm}>
              <h2 className="text-2xl font-bold ">Update your task</h2>
              <p className="my-4 opacity-70">
              Updating ticket process ...
              </p>
              <hr className="my-6" />
              <label className="uppercase text-sm font-bold opacity-70">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:outline-none"
              />
              <label className="uppercase text-sm font-bold opacity-70">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded
                border-2 border-slate-200 focus:outline-none
                "
              />

              <div className="flex space-x-4">
                <input
                  type="submit"
                  className="py-3 px-6 my-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
                  value="Update"
                />
                <input
                  type="submit"
                  className="py-3 px-6 my-2 bg-emerald-500 text-white font-medium rounded  cursor-pointer ease-in-out duration-300"
                  value="Close"
                  onClick={() => setShowEdit(false)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
