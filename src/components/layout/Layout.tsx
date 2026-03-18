import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ScoreInputModal from '../matches/ScoreInputModal';
import MatchRecordModal from '../matches/MatchRecordModal';
import CategoryBanner from './CategoryBanner';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0E1A' }}>
      <Navbar />
      <CategoryBanner />
      <main>
        <Outlet />
      </main>
      <ScoreInputModal />
      <MatchRecordModal />
    </div>
  );
}
