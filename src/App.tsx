import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
// import BoardPage from './pages/BoardPage'
import Sidebar from './components/Sidebar'
// import AllBoardsPage from './pages/AllBoardsPage'
import SearchPage from './pages/SearchPage'
import ShowDetails from './pages/ShowDetails'


function App() {

  return (
    <Router>
      {/* <div className='grid grid-cols-[300px_auto] border border-red-400'> */}
      <div className='flex'>
        <Sidebar />

        <div className='ml-64 w-full min-h-screen border border-blue-500 bg-gray-100 text-gray-900 overflow-hidden'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/tv/:id' element={<ShowDetails />} />
            <Route path='/search' element={<SearchPage />} />
            {/* <Route path='/boards' element={<AllBoardsPage />} />
            <Route path='/boards/:id' element={<BoardPage />} /> */}
            <Route path='*' element={<div className='p-10'>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
