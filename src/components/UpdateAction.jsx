import { CiEdit } from "react-icons/ci";

function UpdateAction({allowEdit,handleEdit}) {
  return (
 

         <button className="flex  gap-2  text-mainColor text-sm cursor-pointer" onClick={handleEdit} type='button'>
      <CiEdit className="cursor-pointer text-xl"/>
    </button>
    
  )
}

export default UpdateAction