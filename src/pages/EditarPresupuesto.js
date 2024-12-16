import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPresupuestos, updatePresupuesto } from "../api/presupuesto";
import { AuthContext } from "../context/AuthContext";

const EditarPresupuesto = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [presupuesto, setPresupuesto] = useState({
    nombre: "",
    montoTotal: "",
    montoAsignado: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Obtener el presupuesto actual por su ID
  useEffect(() => {
    const fetchPresupuesto = async () => {
      try {
        const data = await getPresupuestos(token); // Obtiene todos los presupuestos
        const presupuestoEncontrado = data.find((p) => p._id === id); // Busca por ID

        if (presupuestoEncontrado) {
          setPresupuesto(presupuestoEncontrado);
        } else {
          alert("Presupuesto no encontrado");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error al obtener presupuesto:", error);
        alert("No se pudo obtener el presupuesto");
        navigate("/dashboard");
      }
    };

    fetchPresupuesto();
  }, [id, token, navigate]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!presupuesto.nombre || !presupuesto.montoTotal || !presupuesto.montoAsignado) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    if (parseFloat(presupuesto.montoAsignado) > parseFloat(presupuesto.montoTotal)) {
      setMensaje("El monto asignado no puede ser mayor al monto total");
      return;
    }

    try {
      await updatePresupuesto(token, id, {
        nombre: presupuesto.nombre,
        montoTotal: parseFloat(presupuesto.montoTotal),
        montoAsignado: parseFloat(presupuesto.montoAsignado),
      });

      setMensaje("Presupuesto actualizado exitosamente");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirige al Dashboard después de 2 segundos
    } catch (error) {
      console.error("Error al actualizar presupuesto:", error);
      setMensaje("Error al actualizar el presupuesto");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Editar Presupuesto</h2>
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Presupuesto
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={presupuesto.nombre}
            onChange={(e) => setPresupuesto({ ...presupuesto, nombre: e.target.value })}
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
            value={presupuesto.montoTotal}
            onChange={(e) => setPresupuesto({ ...presupuesto, montoTotal: e.target.value })}
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
            value={presupuesto.montoAsignado}
            onChange={(e) => setPresupuesto({ ...presupuesto, montoAsignado: e.target.value })}
            min="0"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPresupuesto;
