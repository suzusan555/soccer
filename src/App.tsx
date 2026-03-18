import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import GroupStagePage from './pages/GroupStagePage';
import MatchesPage from './pages/MatchesPage';
import KnockoutPage from './pages/KnockoutPage';
import TeamsPage from './pages/TeamsPage';
import SchedulePage from './pages/SchedulePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="groups" element={<GroupStagePage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="knockout" element={<KnockoutPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
