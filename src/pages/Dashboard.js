import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPresupuestos, deletePresupuesto } from "../api/presupuesto";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [presupuestos, setPresupuestos] = useState([]);
  const navigate = useNavigate();

  // Obtener los presupuestos
  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        const data = await getPresupuestos(token);
        setPresupuestos(data);
      } catch (error) {
        console.error("Error al obtener presupuestos:", error);
      }
    };

    fetchPresupuestos();
  }, [token]);

  // Función para eliminar un presupuesto
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este presupuesto?")) {
      try {
        await deletePresupuesto(token, id);
        setPresupuestos(presupuestos.filter((presupuesto) => presupuesto._id !== id));
        alert("Presupuesto eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar presupuesto:", error);
        alert("No se pudo eliminar el presupuesto");
      }
    }
  };

  // Función para finalizar un presupuesto (eliminar)
  const handleFinalize = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas finalizar este presupuesto?")) {
      try {
        await deletePresupuesto(token, id);
        setPresupuestos(presupuestos.filter((presupuesto) => presupuesto._id !== id));
        alert("Presupuesto finalizado y eliminado exitosamente");
      } catch (error) {
        console.error("Error al finalizar presupuesto:", error);
        alert("No se pudo finalizar el presupuesto");
      }
    }
  };

  // Función para calcular el estilo de la tarjeta
  const getCardStyle = (presupuesto) => {
    const { montoTotal, montoAsignado, fechaCreacion } = presupuesto;

    if (montoAsignado >= montoTotal) {
      return { backgroundColor: "green", color: "white" };
    }

    const fecha = new Date(fechaCreacion);
    const ahora = new Date();
    const diferenciaEnDias = Math.floor((ahora - fecha) / (1000 * 60 * 60 * 24));

    if (diferenciaEnDias > 14) {
      return { backgroundColor: "red", color: "white" };
    } else if (diferenciaEnDias > 7) {
      return { backgroundColor: "yellow", color: "black" };
    }

    return {};
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Presupuestos</h2>
      <button
        className="btn btn-success mb-4"
        onClick={() => navigate("/agregar-presupuesto")}
      >
        Agregar Nuevo Presupuesto
      </button>
      <div className="row">
        {presupuestos.map((presupuesto) => (
          <div className="col-md-4 mb-3" key={presupuesto._id}>
            <div className="card" style={getCardStyle(presupuesto)}>
              <div className="card-body">
                <h5 className="card-title">{presupuesto.nombre}</h5>
                <p className="card-text">Monto Total: ${presupuesto.montoTotal}</p>
                <p className="card-text">Monto Asignado: ${presupuesto.montoAsignado}</p>
                <p className="card-text">
                  Fecha de Creación:{" "}
                  {new Date(presupuesto.fechaCreacion).toLocaleDateString()}
                </p>
                {presupuesto.alertas && (
                  <p className="text-danger">¡Atención: Alertas activadas!</p>
                )}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`/editar-presupuesto/${presupuesto._id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(presupuesto._id)}
                  >
                    Eliminar
                  </button>
                  {presupuesto.montoAsignado >= presupuesto.montoTotal && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleFinalize(presupuesto._id)}
                    >
                      Finalizar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
