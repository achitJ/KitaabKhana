import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LibraryPage from "./pages/LibraryPage"
import { useEffect } from 'react'
import { useGenresStore } from './stores/genres'

function App() {

  // const genres = useGenresStore(state => state.genres);
  const getGenres = useGenresStore(state => state.getGenres);

  useEffect(() => {
    getGenres()
      .then(() => {
        console.log(useGenresStore.getState())
      })
      .catch(() => {
        console.error("error")
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/" Component={LibraryPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
