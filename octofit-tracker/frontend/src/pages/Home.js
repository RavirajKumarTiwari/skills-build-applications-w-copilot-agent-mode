import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
          <p className="lead mt-3">
            Track your fitness activities, join teams, and compete on the leaderboard
          </p>
          <div className="mt-4">
            <button className="btn btn-primary btn-lg me-3">Get Started</button>
            <button className="btn btn-outline-primary btn-lg">Learn More</button>
          </div>
        </div>
      </div>

      <div className="features-section mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Activity Tracking</h3>
                <p>Log your workouts and track your fitness progress over time</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Teams</h3>
                <p>Create teams and collaborate with friends for group fitness goals</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>Leaderboard</h3>
                <p>Compete globally and see where you rank among other users</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">💪</div>
                <h3>Workouts</h3>
                <p>Access personalized workout suggestions tailored to your goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
