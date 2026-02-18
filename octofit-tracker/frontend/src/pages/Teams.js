import React, { useState, useEffect } from 'react';
import { teamsAPI } from '../services/api';
import '../styles/Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    max_members: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const data = await teamsAPI.list();
      console.log('Teams loaded:', data);
      setTeams(data);
      setError(null);
    } catch (err) {
      console.error('Error loading teams:', err);
      setError('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({
      ...newTeam,
      [name]: value,
    });
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const result = await teamsAPI.create(newTeam);
      if (result) {
        console.log('Team created successfully:', result);
        setNewTeam({
          name: '',
          description: '',
          max_members: '',
        });
        setShowForm(false);
        await fetchTeams();
      }
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team');
    }
  };

  if (loading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="teams-container">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Teams</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Create New Team'}
          </button>
        </div>

        {showForm && (
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Create New Team</h5>
                  <form onSubmit={handleCreateTeam}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Team Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newTeam.name}
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
                        value={newTeam.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="max_members" className="form-label">Max Members</label>
                      <input
                        type="number"
                        className="form-control"
                        id="max_members"
                        name="max_members"
                        value={newTeam.max_members}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">Create Team</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {teams.length === 0 ? (
          <div className="alert alert-info">No teams available yet. Create one to get started!</div>
        ) : (
          <div className="row">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{team.name}</h5>
                    {team.description && <p className="card-text">{team.description}</p>}
                    <div className="team-info mt-3">
                      {team.member_count !== undefined && (
                        <span className="badge bg-info">Members: {team.member_count}</span>
                      )}
                      {team.max_members && (
                        <span className="badge bg-secondary ms-2">Max: {team.max_members}</span>
                      )}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-sm btn-primary">View Details</button>
                    <button className="btn btn-sm btn-outline-success ms-2">Join</button>
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

export default Teams;
