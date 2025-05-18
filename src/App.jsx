
import './App.css'
import { Routes, Route  } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Todos from './pages/Todos';
  import { ToastContainer } from 'react-toastify';


function App() {
    


  return (
  <div className='bg-backgroundColor '>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
    <ToastContainer

/>
  </div>
  )
}

export default App
