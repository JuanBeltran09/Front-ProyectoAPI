import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api-presupuestos-6dce377b170c.herokuapp.com/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      login(data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Iniciar Sesión</h2>
      {mensaje && <div className="alert alert-danger text-center">{mensaje}</div>}
      <form onSubmit={handleLogin} className="mt-4">
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
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
        <div className="text-center mt-3">
          <p>¿No tienes una cuenta?</p>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate("/registro")}
          >
            Regístrate aquí
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
