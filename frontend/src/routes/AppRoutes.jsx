import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import FarmerDashboard from "../pages/farmer/FarmerDashBoard";
import AgentDashboard from "../pages/agent/AgentDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CropRegistrationForm from "../pages/farmer/CropRegistrationForm";
import MediaUploadForm from "../pages/farmer/MediaUploadForm";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, token } = useContext(AuthContext);
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/farmer" 
        element={
          <PrivateRoute allowedRoles={["farmer"]}>
            <FarmerDashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/agent" 
        element={
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentDashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/farmer/register-crop" 
        element={
          <PrivateRoute allowedRoles={["farmer"]}>
            <CropRegistrationForm />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/farmer/upload-media" 
        element={
          <PrivateRoute allowedRoles={["farmer"]}>
            <MediaUploadForm />
          </PrivateRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;