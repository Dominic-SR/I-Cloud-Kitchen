import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import './App.css'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Menu from './pages/Menu/Menu'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} /> 
    </Routes>
  )
}

export default App
