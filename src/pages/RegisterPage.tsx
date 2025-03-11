import { RegisterForm } from '../components/RegisterForm';
import { useEffect } from 'react';

export const RegisterPage = () => {
  useEffect(() => {
      document.title = "Register - FootieGate";
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <RegisterForm />
    </div>
  );
};