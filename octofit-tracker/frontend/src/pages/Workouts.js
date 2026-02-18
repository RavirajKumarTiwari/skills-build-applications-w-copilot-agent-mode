import React, { useState, useEffect } from 'react';
import { workoutsAPI } from '../services/api';
import '../styles/Workouts.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    difficulty: 'medium',
    duration: '',
    exercises: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const data = await workoutsAPI.list();
      console.log('Workouts loaded:', data);
      setWorkouts(data);
      setError(null);
    } catch (err) {
      console.error('Error loading workouts:', err);
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout({
      ...newWorkout,
      [name]: value,
    });
  };

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      const result = await workoutsAPI.create(newWorkout);
      if (result) {
        console.log('Workout created successfully:', result);
        setNewWorkout({
          name: '',
          description: '',
          difficulty: 'medium',
          duration: '',
          exercises: '',
        });
        setShowForm(false);
        await fetchWorkouts();
      }
    } catch (err) {
      console.error('Error creating workout:', err);
      setError('Failed to create workout');
    }
  };

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="workouts-container">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>💪 Workout Suggestions</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Workout'}
          </button>
        </div>

        {showForm && (
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Create New Workout</h5>
                  <form onSubmit={handleCreateWorkout}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Workout Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newWorkout.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={newWorkout.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="difficulty" className="form-label">Difficulty</label>
                      <select
                        className="form-control"
                        id="difficulty"
                        name="difficulty"
                        value={newWorkout.difficulty}
                        onChange={handleInputChange}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={newWorkout.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exercises" className="form-label">Exercises</label>
                      <textarea
                        className="form-control"
                        id="exercises"
                        name="exercises"
                        value={newWorkout.exercises}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="List exercises separated by commas"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Create Workout</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {workouts.length === 0 ? (
          <div className="alert alert-info">No workouts available yet.</div>
        ) : (
          <div className="row">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    {workout.description && <p className="card-text">{workout.description}</p>}
                    <div className="workout-info mt-3">
                      {workout.difficulty && (
                        <span className={`badge ${getDifficultyBadgeColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      )}
                      {workout.duration && (
                        <span className="badge bg-info ms-2">Duration: {workout.duration} min</span>
                      )}
                    </div>
                    {workout.exercises && (
                      <div className="mt-3">
                        <small><strong>Exercises:</strong></small>
                        <p className="small">{workout.exercises}</p>
                      </div>
                    )}
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-sm btn-primary">Start Workout</button>
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

export default Workouts;
