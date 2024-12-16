import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AgregarPresupuesto from "./pages/AgregarPresupuesto";
import EditarPresupuesto from "./pages/EditarPresupuesto";
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/agregar-presupuesto" element={<PrivateRoute><AgregarPresupuesto /></PrivateRoute>} />
          <Route path="/editar-presupuesto/:id" element={<PrivateRoute><EditarPresupuesto /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
