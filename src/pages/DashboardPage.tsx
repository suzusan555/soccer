import TournamentBanner from '../components/dashboard/TournamentBanner';
import StatsOverview from '../components/dashboard/StatsOverview';
import LiveMatchCard from '../components/dashboard/LiveMatchCard';
import RecentResults from '../components/dashboard/RecentResults';

export default function DashboardPage() {
  return (
    <div>
      <TournamentBanner />
      <StatsOverview />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', padding: '0 32px 40px' }}>
        <div>
          <h2 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em', color: '#C9A84C' }}>⚡ ライブ試合</h2>
          <LiveMatchCard />
        </div>
        <div>
          <h2 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em', color: '#C9A84C' }}>📋 最近の試合結果</h2>
          <RecentResults />
        </div>
      </div>
    </div>
  );
}
