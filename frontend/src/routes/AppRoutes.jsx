  import { Routes, Route } from "react-router-dom";
  import Login from "../pages/Login";
  function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  export default AppRoutes;