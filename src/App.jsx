
import './App.css'
import { Routes, Route  } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
  import { ToastContainer } from 'react-toastify';


function App() {
    


  return (
  <div className='bg-backgroundColor '>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Tasks />} />
    </Routes>
    <ToastContainer

/>
  </div>
  )
}

export default App
