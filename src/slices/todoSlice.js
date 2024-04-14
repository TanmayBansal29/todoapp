import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    // getting the initial todolist from the local storage
    const localTodoList = window.localStorage.getItem('todoList')
    if(localTodoList) {
        return JSON.parse(localTodoList)
    } else {
        // if the local storage is empty adding a empty array into the local storage
        window.localStorage.setItem('todoList', JSON.stringify([]))
    }
}

// providing the initial values to the filtered todo list and the original todolist
const initialTodo= {
    filterStatus : 'all',
    todoList : getInitialTodo()
}

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialTodo,
    reducers: {
        // Add todo reducer to add the new created todo into the local storage and if exists or not exists
        addTodo: (state, actions) => {
            state.todoList.push(actions.payload)
            const todoList = window.localStorage.getItem('todoList')
            if(todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.push({
                    ...actions.payload
                })
                // adding the updated todo list into the local storage
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem('todoList', JSON.stringify([{...actions.payload}]))
            }
        },

        // delete todo reducer to delete the todo based on id from the local storage
        deleteTodo: (state, actions) => {
            // getting the todolist from the local storage
            const todoList = window.localStorage.getItem('todoList')
            if(todoList) {
                const todoListArr = JSON.parse(todoList)
                todoListArr.forEach((todo, index) => {
                    if(todo.id === actions.payload){
                        todoListArr.splice(index, 1);
                    }
                })
                // adding the updated todo list into the local storage
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
                // changing the state of the redux
                state.todoList = todoListArr;
            }
        },

        // Update todo reducer to update the status value when the checkbox is checked or unchecked
        updateTodo: (state, actions) => {
            const todoList = window.localStorage.getItem('todoList')
            if(todoList){
                const todoListArr = JSON.parse(todoList)
                todoListArr.forEach((todo, index) => {
                    if(todo.id === actions.payload.id){
                        todo.status = actions.payload.status
                    }
                });
                // adding the updated todo list into the local storage
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
                // changing the state of the redux
                state.todoList = todoListArr
            }
        },

        // filterTodo reducer to filter the todo based on the status value
        filterTodo: (state, actions) => {
            state.filterStatus = actions.payload
        }
    }
})

export const {addTodo, deleteTodo, updateTodo, filterTodo} = todoSlice.actions
export default todoSlice.reducer