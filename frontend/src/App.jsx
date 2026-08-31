import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* SITE */}
        <Route path="/" element={<Home />} />

        {/* AUTENTICAÇÃO */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />

        {/* SISTEMA */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* QUALQUER ROTA INVÁLIDA */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}