import { CiEdit } from "react-icons/ci";
import { RxUpdate } from "react-icons/rx";


function UpdateAction({allowEdit,handleEdit}) {
  return (
    allowEdit?
    <button  className="flex items-center gap-2 text-mainColor text-sm cursor-pointer disabled:cursor-not-allowed"  type='submit'>
      Update  <RxUpdate className="cursor-pointer"/>
    </button>
    :

         <button className="flex items-center gap-2 text-mainColor text-sm cursor-pointer" onClick={handleEdit} type='button'>
    Edit  <CiEdit className="cursor-pointer"/>
    </button>
    
  )
}

export default UpdateAction