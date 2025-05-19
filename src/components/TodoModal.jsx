import { useEffect, useRef } from "react"
import { useActionState, useState } from "react"
import { useAddTodoMutation, useUpdateTodoMutation } from "../services/todoApi"
  import {  toast } from 'react-toastify';

function TodoModal({children,isOpen,setIsOpen,navigate,todoForEdit}) {
    const [addTodo]=useAddTodoMutation()

    const [updateTodo]=useUpdateTodoMutation()
    
    const [stateSubmit,SubmitformAction,isPendingSubmit]=useActionState(submitTodo,null)
        const [stateEdit,formActionEdit,isPendingEdit]=useActionState(handleUpdateTodo,null)
    
    const [todoDataSubmit,setTodoDataSubmit]=useState({title:"",description:""})
     const [todoDataEdit,setTodoDataEdit]=useState({
            title:todoForEdit?.title,
            description:todoForEdit?.description
        })
    const modalRef=useRef(null)

     useEffect(()=>{
        function handleClick(e){
            
                if(isOpen && e.target===modalRef.current){
                     setIsOpen(false)
                }
        }
        document.addEventListener("click",handleClick)
        return ()=>{
            document.removeEventListener("click",handleClick)
        }
    },[isOpen])


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
        setTodoDataSubmit({title:"",description:""})
        setIsOpen(false)
        window.scrollTo({top:0,behavior:"smooth"})
        if(navigate){
            navigate("/todos")
        }
        toast.success("Task added successfully")
        } catch(err){
            toast.error("Error adding task")
        }
    }

async function handleUpdateTodo(prevState,formData){
    try{
        const title=formData.get("title")
        const description=formData.get("description")
        if(!title){
            toast.error("Title is required")
            return {title:"Title is required"}
        }
        if(!description){
            toast.error("Description is required")
            return {description:"Description is required"}
        }
        if (title===todoForEdit.title && description===todoForEdit.description) {
            toast.error("No changes are made")
            return
        }
        await updateTodo({...todoForEdit,title,description})
        setIsOpen(false)
        toast.success("Task updated successfully")
    } catch(err){
        toast.error("Error updating task")
    }
 }
   
function handleOnChangeEdit(e){
    setTodoDataEdit({...todoDataEdit,[e.target.name]:e.target.value})
}

function handleOnChangeSubmit(e){
    setTodoDataSubmit({...todoDataSubmit,[e.target.name]:e.target.value})
}

  return (
    <>
    {children}

    {isOpen&&
    <div ref={modalRef} className="fixed top-0 left-0 h-full w-full bg-black/50 z-10 flex items-center justify-center">
         {
            todoForEdit?
            
             <form action={formActionEdit} className=" lg:w-[600px] w-[90%]  lg:p-10 p-5 rounded-lg pb-2 flex flex-col gap-3 bg-[#353535] shadow-[0_0_30px_rgba(255,87,34,0.2)]">
        <input value={todoDataEdit.title} onChange={e=>handleOnChangeEdit(e)} autoComplete="off" type="text" name="title" placeholder="Add Task Title" className={` bg-inputBG p-2 rounded-lg placeholder:text-placeholderColor sm:text-base text-xs text-mainColor outline-none ${stateEdit?.title&& "border border-red-500"}`}/>
      {stateEdit?.title&&<span className="text-red-500 text-sm">{stateEdit.title}</span>}
         <textarea value={todoDataEdit.description} onChange={e=>handleOnChangeEdit(e)} autoComplete="off" type="text" name="description" placeholder="Add Task Description" className={` bg-inputBG p-2 rounded-lg sm:text-base text-xs placeholder:text-placeholderColor text-mainColor resize-none h-[100px] outline-none ${stateEdit?.description&& "border border-red-500"}`}/>
    {stateEdit?.description&&<span className="text-red-500 text-sm">{stateEdit.description}</span>}

     <button disabled={isPendingEdit} type="submit" className="bg-actionColor lg:p-2 p-1 lg:text-base text-sm  rounded-lg text-black font-bold disabled:bg-actionColor/50 disabled:cursor-not-allowed cursor-pointer mt-5">Update</button>
        </form>
    
            
            :

            <form action={SubmitformAction} className=" lg:w-[600px] w-[90%] lg:p-10 p-5 rounded-lg pb-2 flex flex-col gap-3 bg-[#353535] shadow-[0_0_30px_rgba(255,87,34,0.2)]">
        <input value={todoDataSubmit.title} onChange={e=>handleOnChangeSubmit(e)} autoComplete="off" type="text" name="title" placeholder="Add Task Title" className={` bg-inputBG p-2 rounded-lg placeholder:text-placeholderColor sm:text-base text-xs text-mainColor outline-none ${stateSubmit?.title&& "border border-red-500"}`}/>
      {stateSubmit?.title&&<span className="text-red-500 text-sm">{stateSubmit.title}</span>}
         <textarea value={todoDataSubmit.description} onChange={e=>handleOnChangeSubmit(e)} autoComplete="off" type="text" name="description" placeholder="Add Task Description" className={` bg-inputBG p-2 rounded-lg sm:text-base text-xs placeholder:text-placeholderColor text-mainColor resize-none h-[100px] outline-none ${stateSubmit?.description&& "border border-red-500"}`}/>
    {stateSubmit?.description&&<span className="text-red-500 text-sm">{stateSubmit.description}</span>}

     <button disabled={isPendingSubmit} type="submit" className="bg-actionColor lg:p-2 p-1 lg:text-base text-sm  rounded-lg text-black font-bold disabled:bg-actionColor/50 disabled:cursor-not-allowed cursor-pointer mt-5">Submit</button>
        </form>
         }
    </div>
    }
    </>
  )
}

export default TodoModal