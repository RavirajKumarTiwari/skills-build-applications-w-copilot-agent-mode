// API service for making calls to the backend
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE_URL = `https://${CODESPACE_NAME}-8000.app.github.dev/api`;

console.log('API Base URL:', API_BASE_URL);

// Helper function to handle both paginated and plain array responses
const normalizeData = (data) => {
  if (data && data.results) {
    console.log('Paginated response detected, extracting results');
    return data.results;
  }
  if (Array.isArray(data)) {
    return data;
  }
  return [];
};

// Users API
export const userAPI = {
  list: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`);
      const data = await response.json();
      console.log('Users fetched:', data);
      return normalizeData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}/`);
      const data = await response.json();
      console.log('User fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
};

// Activities API
export const activitiesAPI = {
  list: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/`);
      const data = await response.json();
      console.log('Activities fetched:', data);
      return normalizeData(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${id}/`);
      const data = await response.json();
      console.log('Activity fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching activity:', error);
      return null;
    }
  },
  create: async (activity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });
      const data = await response.json();
      console.log('Activity created:', data);
      return data;
    } catch (error) {
      console.error('Error creating activity:', error);
      return null;
    }
  },
};

// Teams API
export const teamsAPI = {
  list: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/`);
      const data = await response.json();
      console.log('Teams fetched:', data);
      return normalizeData(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${id}/`);
      const data = await response.json();
      console.log('Team fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching team:', error);
      return null;
    }
  },
  create: async (team) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
      });
      const data = await response.json();
      console.log('Team created:', data);
      return data;
    } catch (error) {
      console.error('Error creating team:', error);
      return null;
    }
  },
};

// Leaderboard API
export const leaderboardAPI = {
  list: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard/`);
      const data = await response.json();
      console.log('Leaderboard fetched:', data);
      return normalizeData(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard/${id}/`);
      const data = await response.json();
      console.log('Leaderboard entry fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching leaderboard entry:', error);
      return null;
    }
  },
};

// Workouts API
export const workoutsAPI = {
  list: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/`);
      const data = await response.json();
      console.log('Workouts fetched:', data);
      return normalizeData(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}/`);
      const data = await response.json();
      console.log('Workout fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching workout:', error);
      return null;
    }
  },
  create: async (workout) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });
      const data = await response.json();
      console.log('Workout created:', data);
      return data;
    } catch (error) {
      console.error('Error creating workout:', error);
      return null;
    }
  },
};
