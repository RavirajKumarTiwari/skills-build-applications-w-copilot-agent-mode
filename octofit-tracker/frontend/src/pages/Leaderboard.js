import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await leaderboardAPI.list();
      console.log('Leaderboard loaded:', data);
      // Sort by points descending
      const sorted = Array.isArray(data) ? data.sort((a, b) => (b.points || 0) - (a.points || 0)) : [];
      setLeaderboard(sorted);
      setError(null);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="leaderboard-container">
      <div className="container mt-5">
        <h1 className="mb-4">🏆 Leaderboard</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        {leaderboard.length === 0 ? (
          <div className="alert alert-info">No leaderboard data available yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Points</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      <span className="badge bg-primary">{index + 1}</span>
                    </td>
                    <td>{entry.user?.username || entry.user || 'Unknown'}</td>
                    <td>
                      <strong>{entry.points || 0}</strong>
                    </td>
                    <td>{entry.activities_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
