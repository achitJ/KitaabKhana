import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LibraryPage from "./pages/LibraryPage"

function App() {
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
