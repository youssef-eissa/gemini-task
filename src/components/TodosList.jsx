import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import TodoModal from "./TodoModal";
import TodoBox from "./TodoBox";


function TodosList({todos}) {
    const [openModal,setOpenModal]=useState(false)
   

  return (
   todos?.length>0?
  
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 p-5 gap-5 relative">
        <div className="text-mainColor lg:flex items-center rounded-lg justify-center border border-mainColor p-6 hidden ">
            <TodoModal setIsOpen={setOpenModal} isOpen={openModal}>
            <div className=" bg-inputBG rounded-lg w-full  h-full flex items-center justify-center">
                <button onClick={()=>setOpenModal(true)} type="button" className="  cursor-pointer w-full h-full flex items-center justify-center">
                <GoPlus className="text-7xl text-actionColor" />
            </button>
            </div>
            </TodoModal>
            
        </div>
        {todos?.map(todo=>(
                <TodoBox key={todo.id} todo={todo}/>
        ))}
         <TodoModal  setIsOpen={setOpenModal} isOpen={openModal}>
               <button onClick={()=>setOpenModal(true)} type="button" className="fixed sm:bottom-5 sm:right-5 bottom-3 right-3 lg:hidden w-fit mx-auto flex items-center justify-center gap-2 bg-actionColor rounded p-1 lg:text-xl text-base" >  <IoAddOutline className="text-2xl sm:text-3xl"/> </button>
               </TodoModal>
    </div>
   :
   <div className="h-screen flex items-center justify-center flex-col gap-5">
   <h1 className="text-mainColor sm:text-2xl font-alpha text-lg ">No Tasks Yet</h1>
     <TodoModal  setIsOpen={setOpenModal} isOpen={openModal}>
               <button onClick={()=>setOpenModal(true)} type="button" className="w-fit mx-auto flex items-center justify-center gap-2 bg-actionColor hover:bg-actionColor/90  rounded p-3 lg:p-2 md:p-2 xs:p-1 transition duration-300  font-bebas tracking-widest lg:text-xl text-base cursor-pointer" >  <IoAddOutline/> Add New Task</button>
               </TodoModal>

   </div>
  )
}

export default TodosList