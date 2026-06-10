import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../Shared/Layouts/MainLayout';
import './reset.css';
import { DailyPage } from '../Pages/DailyPage/DailyPage';
import { MainPage } from '../Pages/MainPage/MainPage';
import { StudyingPage } from '../Pages/StudyingPage/StudyingPage';
import { TrainingPage } from '../Pages/TrainingPage/TrainingPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/studying" element={<StudyingPage />} />
        <Route path="/training" element={<TrainingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
