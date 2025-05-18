import { useEffect } from "react";
import Loader from "../components/Loader";
import SubmitTodoForm from "../components/SubmitTodoForm";
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
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 lg:[&>*]:w-[500px] xs:[&>*]:w-[90%] sm:py-0 py-5">
      <SubmitTodoForm/>
      <TodosList todos={[...todos].reverse()}/>
    </main>
  )
}

export default Todos