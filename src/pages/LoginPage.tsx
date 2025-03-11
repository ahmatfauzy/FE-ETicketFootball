import { LoginForm } from "../components/LoginForm";
import { useEffect } from 'react';

export const LoginPage = () => {
  useEffect(() => {
      document.title = "Login - ETicket Football Match";
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginForm />
    </div>
  );
};
