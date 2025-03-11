import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/match';

export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

export const fetchAllMatches = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getMatchById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createMatch = async (matchData: MatchData) => {
  const response = await axios.post(API_URL, matchData);
  return response.data;
};

export const updateMatch = async (id: string, matchData: MatchData) => {
  const response = await axios.put(`${API_URL}/${id}`, matchData);
  return response.data;
};

export const deleteMatch = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};