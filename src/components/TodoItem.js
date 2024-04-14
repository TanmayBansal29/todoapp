// Compoment representing each Todo item, which is created upon the addition of new todo into the system

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { CheckButton } from "./Button";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  
  // HandleCheck method calling the updateTodo reducer to change the status value in the local storage, which is required for check box login and also the filter logic
  const handleCheck = () => {
    setChecked(!checked)
    dispatch(updateTodo({
        ...todo,
        status: checked ? "incomplete" : "complete"
    }))
  }

  // Using the concept of useEffect to implement the checkbox logic, if the status matches then set the value true otherwise false
  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  // handleDelete function calling the deleteTodo reducer from the store and deleting the task based on the id coming from uuid
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };
  return (
    <>
    <div className="flex items-center justify-start gap-[3rem] relative ">
      <CheckButton checked={checked} handleCheck={handleCheck} />
      <div className={`flex flex-col overflow-hidden ${todo.status === 'complete' ? "line-through opacity-70": ""}`}>
        <p className="break-all font-[700] text-[1.12rem ]">{todo.title}</p>
        <p className="break-all font-300 text-[1rem] mt-[-0.2rem] opacity-90">{todo.description}</p>
        <p className="block text-[1rem] font-300 mt-[-0.2rem] opacity-70">{todo.time}</p>
      </div>
    
      <div className="absolute right-0">
      <div
          className="text-[2rem] p-[0.25rem] bg-red-500 text-white rounded-md cursor-pointer"
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          <MdDelete />
        </div>
      </div>
      
    </div>
    <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
    </>
  );
}

export default TodoItem;
