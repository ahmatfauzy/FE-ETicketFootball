import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Import dashboard components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MatchList from './pages/matches/MatchList';
import MatchForm from './pages/matches/MatchForm';
import TicketList from './pages/tickets/TicketList';
import TicketForm from './pages/tickets/TicketForm';

// Dashboard layout component that includes the sidebar
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Match Management Routes */}
          <Route 
            path="/matches" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MatchList />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matches/add" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MatchForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matches/edit/:id" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MatchForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Ticket Management Routes */}
          <Route 
            path="/tickets" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TicketList />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tickets/add" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TicketForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tickets/edit/:id" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TicketForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;