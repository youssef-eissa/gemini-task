import { useEffect } from "react";
import Loader from "../components/Loader";
import TodosList from "../components/TodosList";
import { useGetTodosQuery } from "../services/todoApi";

function Todos() {
    const { data: todos , isLoading,error } = useGetTodosQuery();
    

     useEffect(()=>{
        if(error){
            toast.error("Error fetching todos")
        }
    },[error])
    if(isLoading){
      return <Loader />
    }

  

  return (
    <main className=" min-h-screen">
      <TodosList todos={[...todos].reverse()}/>

    </main>
  )
}

export default Todos