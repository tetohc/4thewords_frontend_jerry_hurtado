import { useEffect, useState } from "react";
import { deleteLegend, getLegends } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const LegendTable = () => {
  const navigate = useNavigate();
  const [legends, setLegends] = useState([]);

  // Obtener leyendas
  const getData = async () => {
    try {
      const data = await getLegends();
      setLegends(data);
    } catch (error) {
      console.error("Failed to fetch legends:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Eventos de botones
  const onDetailLegend = (id) => {
    navigate(`/legend/${id}`);
  };

  const onUpdateLegend = (id) => {
    navigate(`/update/${id}`);
  };

  const onDeleteLegend = (id) => {
    Swal.fire({
      text: "¿Está seguro que quiere eliminarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4FC3F7",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteLegend(id);
          Swal.fire({
            title: "Eliminado!",
            text: "La leyenda se ha eliminado con éxito.",
            icon: "success",
          }).then(() => {
            getData();
          });
        } catch {
          Swal.fire({
            icon: "warning",
            text: "No se pudo eliminar la leyenda.",
            showConfirmButton: true,
            confirmButtonText: "Cerrar",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto mt-10 mx-auto max-w-5xl p-4">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="w-1/4 md:w-auto">Nombre</th>
              <th className="w-1/4 md:w-auto">Categoría</th>
              <th className="w-1/4 md:w-auto">Ubicación</th>
              <th className="w-1/4 md:w-auto">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {legends?.data?.map((legend) => (
              <tr key={legend?.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar hidden sm:block">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`data:image/png;base64,${legend?.imageUrl}`}
                          alt={`Avatar of ${legend?.name?.trim()}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{legend?.name?.trim()}</div>
                      <div className="text-sm opacity-50">
                        {legend?.province?.trim()}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{legend?.category?.trim()}</td>
                <td>
                  {legend?.province?.trim()}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {legend?.canton?.trim()} {legend?.district?.trim()}
                  </span>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs mr-2"
                    onClick={() => onDetailLegend(legend?.id)}
                  >
                    Detalles
                  </button>
                  <button className="btn btn-ghost btn-xs mr-2" onClick={() => onUpdateLegend(legend?.id)}>Editar</button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => onDeleteLegend(legend?.id)}
                  >
                    Eliminar
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
