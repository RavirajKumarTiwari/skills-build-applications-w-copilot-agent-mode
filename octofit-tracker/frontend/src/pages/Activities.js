import React, { useState, useEffect } from 'react';
import { activitiesAPI } from '../services/api';
import '../styles/Activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    activity_type: '',
    duration: '',
    calories_burned: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await activitiesAPI.list();
      console.log('Activities loaded:', data);
      setActivities(data);
      setError(null);
    } catch (err) {
      console.error('Error loading activities:', err);
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const result = await activitiesAPI.create(newActivity);
      if (result) {
        console.log('Activity created successfully:', result);
        setNewActivity({
          name: '',
          description: '',
          activity_type: '',
          duration: '',
          calories_burned: '',
        });
        await fetchActivities();
      }
    } catch (err) {
      console.error('Error creating activity:', err);
      setError('Failed to create activity');
    }
  };

  if (loading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="activities-container">
      <div className="container mt-5">
        <h1 className="mb-4">Activities</h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Log New Activity</h5>
                <form onSubmit={handleCreateActivity}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Activity Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newActivity.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activity_type" className="form-label">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="activity_type"
                      name="activity_type"
                      value={newActivity.activity_type}
                      onChange={handleInputChange}
                      placeholder="e.g., Running, Swimming"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="duration"
                      name="duration"
                      value={newActivity.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="calories_burned" className="form-label">Calories Burned</label>
                    <input
                      type="number"
                      className="form-control"
                      id="calories_burned"
                      name="calories_burned"
                      value={newActivity.calories_burned}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={newActivity.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Log Activity</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <h2 className="mt-5 mb-3">Your Activities</h2>
        {activities.length === 0 ? (
          <div className="alert alert-info">No activities logged yet. Start by logging your first activity!</div>
        ) : (
          <div className="row">
            {activities.map((activity) => (
              <div key={activity.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{activity.name}</h5>
                    <p className="card-text">{activity.activity_type}</p>
                    <div className="activity-details">
                      <span className="badge bg-info">Duration: {activity.duration} min</span>
                      {activity.calories_burned && (
                        <span className="badge bg-warning ms-2">Calories: {activity.calories_burned}</span>
                      )}
                    </div>
                    {activity.description && <p className="card-text small mt-2">{activity.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
