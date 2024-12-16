import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPresupuestos, deletePresupuesto } from "../api/presupuesto";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [presupuestos, setPresupuestos] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getCardStyle = (presupuesto) => {
    if (!presupuesto.alertas) {
      return {}; // No aplica ningún color si las alertas están desactivadas
    }

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
    <div>
      <div className="bg-primary text-white d-flex justify-content-between align-items-center p-3">
        <h1 className="m-0">Gestión de Presupuestos</h1>
        <button className="btn btn-light btn-sm" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="container mt-4">
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
                        onClick={() => handleDelete(presupuesto._id)}
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
    </div>
  );
};

export default Dashboard;
