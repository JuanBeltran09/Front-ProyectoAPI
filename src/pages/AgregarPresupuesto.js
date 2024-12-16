import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createPresupuesto } from "../api/presupuesto";
import { AuthContext } from "../context/AuthContext";

const AgregarPresupuesto = () => {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [montoTotal, setMontoTotal] = useState("");
  const [montoAsignado, setMontoAsignado] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !montoTotal || !montoAsignado || !fechaCreacion) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    if (parseFloat(montoAsignado) > parseFloat(montoTotal)) {
      setMensaje("El monto asignado no puede ser mayor que el monto total");
      return;
    }

    try {
      const newPresupuesto = {
        nombre,
        montoTotal: parseFloat(montoTotal),
        montoAsignado: parseFloat(montoAsignado),
        fechaCreacion: new Date(fechaCreacion),
        alertas: true, // Activar alertas por defecto
      };

      await createPresupuesto(token, newPresupuesto);
      setMensaje("Presupuesto creado exitosamente");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error al crear presupuesto:", error);
      setMensaje("No se pudo crear el presupuesto");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Agregar Nuevo Presupuesto</h2>
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Presupuesto
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
          <label htmlFor="montoTotal" className="form-label">
            Monto Total
          </label>
          <input
            type="number"
            className="form-control"
            id="montoTotal"
            value={montoTotal}
            onChange={(e) => setMontoTotal(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="montoAsignado" className="form-label">
            Monto Asignado
          </label>
          <input
            type="number"
            className="form-control"
            id="montoAsignado"
            value={montoAsignado}
            onChange={(e) => setMontoAsignado(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaCreacion" className="form-label">
            Fecha de Creación
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaCreacion"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Crear Presupuesto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarPresupuesto;
