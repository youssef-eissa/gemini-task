import TodoBox from "./TodoBox"

function TodosList({todos}) {

  return (
   todos?.length>0?
    <ul className='text-white border border-mainColor scrollbar scrollbar-track-mainColor  scrollbar-thumb-actionColor  p-5 h-[400px] overflow-y-auto rounded gap-3 flex flex-col  ' >
        {todos?.map(todo=>(
            <li className="border-b border-mainColor pb-2 last:border-none" key={todo.id}>
                <TodoBox todo={todo}/>
            </li>
        ))}
    </ul>
   :
   <h1 className="text-mainColor sm:text-2xl font-alpha text-lg ">No todos yet</h1>
  )
}

export default TodosList