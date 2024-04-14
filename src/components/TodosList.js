// Component showing all the todo items together, using the map function to implement the same logic.

import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

function TodosList() {

    // getting all the todos from the local storage from redux store using teh useSelector method
    const todoList = useSelector((state) => state.todoList)
    const sortedTodoList = [...todoList]
    // Sorting the todos on the basis of time entered
    sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time))

    // Getting the list of the filtered todo from the redux based on the select value from the select button option choosed
    const filterStatus = useSelector((state) => state.filterStatus)
    // applying the filter method over the sortedfilteredlist to create a new filteredList based on the status value
    const filteredList = sortedTodoList.filter(item => {
        if(filterStatus === 'all'){
            return true;
        }
        return item.status === filterStatus
    })
  return (
    <div className='p-[1.3rem] border-[2px] border-black shadow-xl rounded-md  bg-[#ffffff]'>
        {
            filteredList && filteredList.length > 0 ? filteredList.map((todo) => <TodoItem todo={todo} key={todo.id}></TodoItem>) : <p className='text-[1.5rem] font-500 text-center mx-0 my-auto px-[0.5rem] py-[1rem] selection:w-max h-auto'>👾 No To-do Found 👾</p>
        }
    </div>
  )
}

export default TodosList