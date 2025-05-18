  import { MdDeleteOutline } from "react-icons/md";
import { useDeleteTodoMutation } from "../services/todoApi";
import { useCallback } from "react";
  import { toast } from 'react-toastify';


function DeleteBTN({id}) {

    const [deleteTodo]=useDeleteTodoMutation()

    const handleDelete=useCallback(async()=>{
     await deleteTodo(id)
       toast.success("Task deleted successfully")
    },[id,deleteTodo])

  return (
     <button onClick={handleDelete} type="button">
                <MdDeleteOutline className="text-red-500 text-2xl cursor-pointer"/>
            </button>
  )
}

export default DeleteBTN