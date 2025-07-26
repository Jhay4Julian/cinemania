import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'


function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-100 text-gray-900'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='*' element={<div className='p-10'>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
