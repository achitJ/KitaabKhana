import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LibraryPage from "./pages/LibraryPage"
// import { useEffect } from 'react'
// import { useGenresStore } from './stores/genres'

function App() {
  // const getGenres = useGenresStore(state => state.getGenres);
  // const navigate = useNavigate()

  // useEffect(() => {
  //   getGenres()
  //     .then(() => {
  //       if(useGenresStore.getState().genres.length === 0) {
  //         navigate("/login");
  //         return;
  //       }
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       navigate("/login");
  //     })
  // }, [])

  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/home" Component={LibraryPage} />
    </Routes>
  )
}

export default App
