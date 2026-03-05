import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import PatientsDashboard from './components/PatientsDashboard'
import { useAuthStore } from './store/authStore'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/patients" replace /> : <Login />} />
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute>
            <PatientsDashboard />
          </ProtectedRoute>
        } 
      />
      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) 
}

export default App
