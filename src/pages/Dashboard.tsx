import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">User Info</h2>
            <p className="text-gray-600">
              <strong>ID:</strong> {user?.id}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-500">
              This is a protected dashboard page. You're now logged in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};