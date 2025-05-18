import { useActionState, useState } from "react"
import { useAddTodoMutation } from "../services/todoApi"
  import {  toast } from 'react-toastify';


function SubmitTodoForm() {
    const [addTodo]=useAddTodoMutation()
const [state,formAction,isPending]=useActionState(submitTodo,null)

const [todoData,setTodoData]=useState({title:"",description:""})

    
async function submitTodo(prevState, formData) {
    try{
        const title=formData.get("title")
    const description=formData.get("description")

    if(!title){
        toast.error("Title is required")
        return {title:"Title is required"}
    }

    if (!description) {
        toast.error("Description is required")
        return { description: "Description is required" };
    }
    await addTodo({title,description})
    setTodoData({title:"",description:""})
    toast.success("Task added successfully")
    } catch(err){
        toast.error("Error adding task")
    }
}
   
  return (
 <form action={formAction} className="border border-mainColor p-3 rounded flex flex-col gap-3">
    <input value={todoData.title} onChange={e=>setTodoData({...todoData,title:e.target.value})} autoComplete="off" type="text" name="title" placeholder="Add Task Title" className={` bg-inputBG p-2 rounded-lg placeholder:text-placeholderColor sm:text-base text-xs text-mainColor outline-none ${state?.title&& "border border-red-500"}`}/>
    {state?.title&&<span className="text-red-500 text-sm">{state.title}</span>}
     <textarea value={todoData.description} onChange={e=>setTodoData({...todoData,description:e.target.value})} autoComplete="off" type="text" name="description" placeholder="Add Task Description" className={` bg-inputBG p-2 rounded-lg sm:text-base text-xs placeholder:text-placeholderColor text-mainColor resize-none h-[100px] outline-none ${state?.description&& "border border-red-500"}`}/>
    {state?.description&&<span className="text-red-500 text-sm">{state.description}</span>}

     <button disabled={isPending} type="submit" className="bg-actionColor lg:p-2 p-1 lg:text-base text-sm  rounded-lg text-black font-bold disabled:bg-actionColor/50 disabled:cursor-not-allowed cursor-pointer ">Submit</button>
 </form>

  )
}

export default SubmitTodoForm