/* eslint-disable no-unused-vars */
import {createContext , useContext} from 'react'

export const TodoContext = createContext({
    Todo : [ 
        {
            Todo : 'text',
            id : 1,
            complete : false,
        }
    ],
    addTodo : ( Todo )=>{} ,
    deleteTodo : (id)=>{},
    toggleComplete : (id)=>{},
    updateTodo : (id , Todo) =>{}
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}

