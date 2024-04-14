// Dialog / Prompt box for creating a new todo task, where we have the option to add title, description and status.

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo } from "../slices/todoSlice";
import Button, { SelectButton } from "./Button";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

export const AddTodoDialog = ({ modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");

  // useDispatch() from react-redux library
  const dispatch = useDispatch();

  // A function for handling the submit where the add todo slice from the redux store has been used to store the todo into the local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && status) {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          description,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success("Task Added Successfully");
      setModalOpen(false);
    }
    else{
      toast.error("Fill All the Details")
    }
  };

  // Structure for the Todo Modal
  return (
    modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-[1000]">
        <div className="mt-10 flex flex-col gap-5 text-white">
          <motion.div
            className="place-self-end text-[30px]"
            onKeyDown={() => setModalOpen(false)}
            onClick={() => setModalOpen(false)}
            role="button"
            tabIndex={0}
            // animation
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
          >
            <MdOutlineClose />
          </motion.div>
          <form className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl px-20 py-10 flex flex-col gap-5 mx-4" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-start">ADD TODO</h1>
            <div className="flex flex-col">
              <label
                htmlFor="title"
              >
                <span>Title</span>
              </label>
              <input
                className="block w-full py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
              >
                <span>
                  Description
                </span>
              </label>
              <input
                className="block w-full py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={description}
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label htmlFor="status">
              <span>Status</span>
              <SelectButton
                className="block w-full py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="type"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </SelectButton>
            </label>
            <div className="flex justify-between">
              <Button className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">ADD TASK</Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
