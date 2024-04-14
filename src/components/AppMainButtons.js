// A component to create a header type thing, where we have one button to open the dialog box, and then we have a select input field acting as a filter option

import React, { useState } from 'react';
import { AddTodoDialog } from './AddTodoDialog';
import Button, { SelectButton } from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodo } from '../slices/todoSlice';

const AppMainButtons = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()
    // Getting all the filtered status from the redux store using the useSelector method
    const filterStatus = useSelector((state) => state.filterStatus)

    // calling the updateFilterTodo reducer to filter the todo based on status
    const updatefilterTodo = (e) => {
        dispatch(filterTodo(e.target.value))
    }

  return (
    <div className='flex items-center justify-between h-[60px]'>
        <Button className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={() => setModalOpen(true)}>ADD TASK</Button>
        <SelectButton className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="status" onChange={updatefilterTodo} value={filterStatus}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
        </SelectButton>
        <AddTodoDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppMainButtons