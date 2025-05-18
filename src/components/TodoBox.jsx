import { useCallback, useOptimistic,startTransition, useState, useRef, useActionState, useEffect } from "react"
import { useUpdateTodoMutation } from "../services/todoApi"
  import { toast } from 'react-toastify';
import DeleteBTN from "./DeleteBTN";
import UpdateAction from "./UpdateAction";



function TodoBox({todo}) {

    const [todoData,setTodoData]=useState({
        title:todo.title,
        description:todo.description
    })

    const [state,formAction,isPending]=useActionState(handleUpdateTodo,null)

    const [allowEdit,setAllowEdit]=useState(false)

    const titleRef=useRef(null)
    const descriptionRef=useRef(null)

    const [updateTodo]=useUpdateTodoMutation()

    const [optimisticStatus,updateOptimisticStatus]=useOptimistic(todo?.status,(prev,newStatus)=>({...prev,status:newStatus}))

    useEffect(()=>{
        if(titleRef.current){
            // console.log(titleRef.current.focus())
        }
    })

    const toggleTodoStatus=useCallback(async()=>{
        startTransition(()=>{
       updateOptimisticStatus(!optimisticStatus)
        })
        const res=await updateTodo({...todo,status:!todo.status})

        if(res.error){
            toast.error("Error updating todo")
        } else if(res.data.status){
            toast.success("Todo is done")
        } else {
            toast.success("Todo is in progress")
        }
    },[todo,optimisticStatus,updateOptimisticStatus,updateTodo])


    const handleEdit=useCallback((e)=>{
        e.preventDefault()
        setAllowEdit(true)
        titleRef.current.focus()
        titleRef.current.setSelectionRange(titleRef.current.value.length,titleRef.current.value.length)

    },[])

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
        if (title===todo.title && description===todo.description) {
            toast.error("No changes are made")
            return
        }
        await updateTodo({...todo,title,description})
        setAllowEdit(false)
        toast.success("Todo updated successfully")
    }catch(err){
        toast.error("Error updating todo")
    }
 }
    



  return (
    <form action={formAction} className="w-full flex md:flex-row flex-col items-center justify-between gap-4  ">
        {/* checkbox */}
<div  className="checkbox-wrapper">
  <input onChange={toggleTodoStatus} id={`todo-${todo.id}`} name="checkbox" defaultChecked={todo.status} type="checkbox"/>
  <label className="terms-label" htmlFor={`todo-${todo.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="checkbox-svg">
      <mask fill="white" id="path-1-inside-1_476_5-37">
        <rect height="200" width="200"></rect>
      </mask>
      <rect mask="url(#path-1-inside-1_476_5-37)" strokeWidth="40" className="checkbox-box !fill-inputBG" height="200" width="200"></rect>
      <path strokeWidth="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
    </svg>
    <span className="label-text hidden">{todo.title}</span>
  </label>
</div>
        {/* checkbox */}

        {/* inputs */}

        <div className="flex flex-col flex-1 gap-2 w-full">
            <input onFocus={()=>setAllowEdit(true)} value={todoData.title} onChange={(e)=>setTodoData({...todoData,title:e.target.value})} ref={titleRef} placeholder="Add Todo Title" className="bg-inputBG p-2 rounded-md text-mainColor outline-none focus:border focus:border-mainColor sm:text-base text-xs " type="text" name="title" />
            {state?.title&&<span className="text-red-500 text-sm">{state.title}</span>}
             <textarea onFocus={()=>setAllowEdit(true)} value={todoData.description} onChange={(e)=>setTodoData({...todoData,description:e.target.value})} ref={descriptionRef} placeholder="Add Todo Description" className="bg-inputBG p-2 rounded-md outline-none resize-none overflow-auto sm:text-base text-xs h-[100px] text-mainColor focus:border focus:border-mainColor" type="text" name="description" />
    {state?.description&&<span className="text-red-500 text-sm">{state.description}</span>}

        </div>


        {/* inputs */}

        {/* actions */}

        <div className="flex items-center gap-2 min-w-[102px]">
            <UpdateAction allowEdit={allowEdit}  handleEdit={handleEdit}/>
           <DeleteBTN id={todo.id}/>
        </div>

        {/* actions */}

    </form>
  )
}

export default TodoBox