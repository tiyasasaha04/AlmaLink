import React from 'react';
import { useAuth } from '../hooks/useAuth';
import CreatePost from '../components/feed/CreatePost';
import PostFeed from '../components/feed/PostFeed';
import OpportunitiesWidget from '../components/jobs/OpportunitiesWidget';
import MiniProfile from '../components/common/MiniProfile';
import './DashboardPage.css'; // Add styles

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* --- Column 1: Mini Profile --- */}
      <aside className="dashboard-left">
        {user && <MiniProfile user={user} />}
      </aside>

      {/* --- Column 2: The "Quad" / News Feed --- */}
      <main className="dashboard-main">
        <CreatePost />
        <PostFeed />
      </main>

      {/* --- Column 3: Widgets --- */}
      <aside className="dashboard-right">
        <OpportunitiesWidget />
        {/* We can add an "Events" widget here later */}
      </aside>
    </div>
  );
};

export default DashboardPage;