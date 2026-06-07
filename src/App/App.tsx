import { Route, Routes } from "react-router-dom"
import { MainLayout } from "../Shared/Layouts/MainLayout"
import './reset.css'
import { DailyPage } from "../Pages/DailyPage/DailyPage"

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DailyPage />}/>
      </Route>
    </Routes>
  )
}

export default App
