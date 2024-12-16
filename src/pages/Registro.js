import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar el usuario");
      }

      setMensaje("Usuario registrado exitosamente");
      setTimeout(() => navigate("/login"), 2000); // Redirige al login después de 2 segundos
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registro de Usuario</h2>
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}
      <form onSubmit={handleRegistro} className="mt-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrar Usuario
        </button>
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate("/login")}
          >
            Volver al Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
