import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const getActivities = async () => {
  const response = await axios.get(`${API_BASE_URL}/activities`);
  return response.data;
};