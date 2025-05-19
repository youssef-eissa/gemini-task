import { useCallback, useOptimistic,startTransition, useState } from "react"
import { useUpdateTodoMutation } from "../services/todoApi"
  import { toast } from 'react-toastify';
import DeleteBTN from "./DeleteBTN";
import TodoModal from "./TodoModal";
import { CiEdit } from "react-icons/ci";




function TodoBox({todo}) {

    const [openModal,setOpenModal]=useState(false)


    const [updateTodo]=useUpdateTodoMutation()

    const [optimisticStatus,updateOptimisticStatus]=useOptimistic(todo?.status,(prev,newStatus)=>({...prev,status:newStatus}))

   
    const toggleTodoStatus=useCallback(async()=>{
        startTransition(()=>{
       updateOptimisticStatus(!optimisticStatus)
        })
        const res=await updateTodo({...todo,status:!todo.status})

        if(res.error){
            toast.error("Error updating Task")
        } else if(res.data.status){
            toast.success("Task is done")
        } else {
            toast.success("Task is in progress")
        }
    },[todo,optimisticStatus,updateOptimisticStatus,updateTodo])

  return (
    <div  className={`w-full flex  flex-col items-center justify-between gap-4 border ${todo.status?"border-actionColor":"border-mainColor"} p-3 rounded-lg`}>
       <div className="flex items-center gap-3 w-full">
 {/* checkbox */}
<div  className="checkbox-wrapper">
  <input  onChange={toggleTodoStatus} id={`todo-${todo.id}`} name="checkbox" defaultChecked={todo.status} type="checkbox"/>
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

        {/* todos details */}

        <div className="flex flex-col flex-1 gap-2 w-full">
            
            <span className="bg-inputBG p-2 h-[40px] rounded-md text-mainColor outline-none  sm:text-base text-xs overflow-scroll  break-words ">{todo.title}</span>
            <p className="bg-inputBG p-2 rounded-md overflow-scroll w-full  sm:text-base text-xs h-[100px] text-mainColor break-words">{todo.description}</p>
             

        </div>
                {/* todos details */}

       </div>

        {/* actions */}

        <div className="flex  items-center justify-end ms-auto gap-2 min-w-[102px]">

            <TodoModal todoForEdit={todo} setIsOpen={setOpenModal} isOpen={openModal}>
                        
                         <button className="flex  gap-2  text-mainColor text-sm cursor-pointer" onClick={()=>setOpenModal(true)} type='button'>
                              <CiEdit className="cursor-pointer text-xl"/>
                            </button>
                        </TodoModal>
           <DeleteBTN id={todo.id}/>
        </div>

        {/* actions */}

    </div>
  )
}

export default TodoBox