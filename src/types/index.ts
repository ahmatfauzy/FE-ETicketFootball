export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  data: User;
}

export interface ErrorResponse {
  error: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  stadium: string;
}

export interface Ticket {
  id: string;
  matchId: string;
  userId: string;
  seatNumber: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  match?: Match;
  user?: User;
}
