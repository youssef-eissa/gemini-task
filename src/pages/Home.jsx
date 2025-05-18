import { Link } from "react-router-dom";
import { useGetTodosQuery } from "../services/todoApi";
import { IoAddOutline } from "react-icons/io5";
import Loader from "../components/Loader";

function Home() {
  const { data: todos , isLoading } = useGetTodosQuery();
    const doneTodos =todos?.filter(todo=>todo.status===true).length
    const inProgressTodos =todos?.filter(todo=>todo.status===false).length

if(isLoading){
  return <Loader />
}

  return (
    <main className='  min-h-screen  flex items-center justify-center flex-col gap-5 '>
      <h1 className="text-mainColor text-4xl xl:text-3xl lg:text-2xl xs:text-xl font-alpha tracking-widest ">Todo List</h1>
      {/* todos statistics */}
     <div className="border border-mainColor  p-5 rounded-xl flex flex-col md:w-[500px] gap-3 xs:w-[90%]">

      {/* todos done */}

     <div className="flex items-center justify-between font-alpha ">
      <span className="text-mainColor text-4xl xl:text-3xl lg:text-2xl xs:text-xl">
        Done Tasks
      </span>
      <span className="xl:w-20 lg:w-16 xs:w-12 xs:text-xs lg:text-sm aspect-square rounded-full bg-actionColor flex items-center justify-center ">
        {doneTodos} / {todos?.length}
      </span>
     </div>

        {/* todos done */}

        {/* todos in progress */}

     <div className="flex items-center justify-between font-alpha">
      <span className="text-mainColor text-4xl xl:text-3xl lg:text-2xl xs:text-xl">
        In Progress Tasks
      </span>
      <span className=" aspect-square rounded-full bg-actionColor flex items-center justify-center xl:w-20 lg:w-16 xs:w-12 xs:text-xs lg:text-sm">
        {inProgressTodos} / {todos?.length}
      </span>
     </div>

      {/* todos in progress */}

  <span className="text-subColor tracking-[6px] lg:text-lg font-bebas text-sm">Keep it up</span>



     </div>
      {/* todos statistics */}
        
        <Link className="w-fit mx-auto flex items-center justify-center gap-2 bg-actionColor hover:bg-actionColor/90  rounded p-3 lg:p-2 md:p-2 xs:p-1 transition duration-300  font-bebas tracking-widest lg:text-xl text-base" to={"/todos"}>  <IoAddOutline/> Add Task</Link>

    </main>
  )
}

export default Home