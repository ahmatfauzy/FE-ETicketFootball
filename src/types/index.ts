export interface User {
    id: number;
    email: string;
  }
  
  export interface AuthResponse {
    message: string;
    data: User;
  }
  
  export interface ErrorResponse {
    error: string;
  }