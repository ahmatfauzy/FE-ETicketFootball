import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

// dashboard admin
import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import MatchList from "./pages/admin/matches/MatchList";
import MatchForm from "./pages/admin/matches/MatchForm";
import TicketList from "./pages/admin/tickets/TicketList";
import TicketForm from "./pages/admin/tickets/TicketForm";

// user
import HomePage from "./pages/HomePage";
import MatchListPage from "./pages/MatchListPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import UserTicketForm from "./pages/TicketForm";
// import MyTicketsPage from "./pages/MyTicketsPage";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">{children}</div>
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
                {/* <Dashboard /> */}
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminDashboard />
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

          <Route path="/homepage" element={<HomePage />} />

          <Route path="/matches/user" element={<MatchListPage />} />

          <Route
            path="/my-tickets/"
            element={
              <ProtectedRoute>
                <MyTicketsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/user/add"
            element={
              <ProtectedRoute>
                {/* <DashboardLayout> */}
                <UserTicketForm />
                {/* </DashboardLayout> */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
