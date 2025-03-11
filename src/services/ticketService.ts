import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/api/ticket';

export interface TicketData {
  matchId: string;
  userId: string;
  seatNumber: string;
  price: number;
}

export const fetchAllTickets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTicketById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTicket = async (ticketData: TicketData) => {
  const response = await axios.post(API_URL, ticketData);
  return response.data;
};

export const updateTicket = async (id: string, ticketData: TicketData) => {
  const response = await axios.put(`${API_URL}/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
