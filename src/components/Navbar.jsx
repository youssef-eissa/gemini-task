import { Link ,NavLink} from 'react-router-dom'

function Navbar() {
  const links=[
    {
      id:1,
      name:"Home",
      path:"/"
    },
    {
      id:2,
      name:"Tasks",
      path:"/tasks"
    }
  ]
  return (
    <nav className="flex items-center justify-between p-5  shadow-md  shadow-actionColor ">
      <Link className='text-actionColor lg:text-3xl sm:text-2xl font-alpha' to='/'>Todo App</Link>
    <div className='flex items-center gap-4 sm:text-lg text-xs'>
      {
        links.map(link=>(
          <NavLink className={({isActive})=>isActive?"text-actionColor  underline-offset-4 underline":"text-mainColor"}  key={link.id} to={link.path}>{link.name}</NavLink>
        ))
      }
    </div>
   </nav>
  )
}

export default Navbar