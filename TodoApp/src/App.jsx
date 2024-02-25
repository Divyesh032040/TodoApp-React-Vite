
import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem.jsx'

function App() {
  const [Todo, setTodo] = useState([ ])

  //functionalities
  const addTodo = (Todo) => {
    setTodo(( prevTodo )=>[{ id:Date.now() , ...Todo}, ...prevTodo])
  }

  const updateTodo = (id, updatedTodo) => {
    setTodo((prevTodo) =>
      prevTodo.map((eachTodo) =>
        eachTodo.id === id ? updatedTodo : eachTodo
      )
    );
  };
  

  // inn filter - we have to tell hm what we want return - else he remove cause filter only work on true statement 
  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo) => todo.id !== id))
  }

  //basically we overwrite a complete property of Todo object 
  const toggleComplete = (id)=>{setTodo((prevTodo)=>prevTodo.map((each)=>
    each.id === id ? {...each , complete : ! each.complete} : each
  ))}

  useEffect(() => {
    const storedTodo = localStorage.getItem("Todos");
    console.log("Stored Todo:", storedTodo);
  
    try {
      const parsedTodo = JSON.parse(storedTodo);
      if (parsedTodo && parsedTodo.length > 0) {
        setTodo(parsedTodo);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, []);
  

  useEffect(()=>{
    localStorage.setItem('Todos' ,JSON.stringify(Todo))
  } , [Todo])





  return (
    <>
    <TodoProvider value={{Todo ,addTodo , deleteTodo , updateTodo , toggleComplete }}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Tasks</h1>
                    <div className="mb-4">
                      {/* Todo Form  */}
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3"> 
                        {/*Loop and Add TodoItem here */}

                         {Todo.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem Todo={todo} />
                          </div>
                        ))}

                    </div>
                </div>
            </div>
      </TodoProvider>
    </>
  )
}

export default App
