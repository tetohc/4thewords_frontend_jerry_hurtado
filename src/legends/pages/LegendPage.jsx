import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLegendById } from "../services/apiService";
import { PrimaryButton } from "../../components";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale"

export const LegendPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [legend, setLegend] = useState(null);
  const [relativeDate, setRelativeDate] = useState('');

  // obtener leyenda por id
  useEffect(() => {
    const getLegend = async () => {
      try {
        const legendData = await getLegendById(id);
        
        // validar si existe
        if (!legendData) {
          return navigate(-1)
        }

        const legend = legendData?.data;
        setLegend(legend);
        
        // Calcular la fecha relativa
        if (legend?.date) {
          const date = parseISO(legend.date);
          const formattedDate = formatDistanceToNow(date, { addSuffix: true, locale: es });
          setRelativeDate(formattedDate);
      }
      } catch (error) {
        console.log('Error getLegendById', error)
      }
    }
    getLegend();
  }, [id, navigate]);

  const onNavigateBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="flex mt-5 gap-8 px-8">
        <div className="w-1/3">
          {legend ? (
            legend.imageUrl ? (
              <img
                src={`data:image/png;base64,${legend.imageUrl}`}
                alt={legend.name}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <p>Imagen no disponible</p>
            )
          ) : (
            <p>Cargando...</p> // Mensaje mientras se cargan los datos
          )}
        </div>
        <div className="w-2/3 px-4">
          {legend ? (
            <>
              <h3 className="text-2xl font-bold mb-3">{legend.name}</h3>
              <ul className="list-none p-0 mb-3">
                <li className="p-2 border-b border-gray-200"><b>Categoría:</b> {legend?.category}</li>
                <li className="p-2 border-b border-gray-200"><b>Descripción:</b> {legend?.description}</li>
                <li className="p-2 border-b border-gray-200"><b>Provincia:</b> {legend?.province}</li>
                <li className="p-2 border-b border-gray-200"><b>Cantón:</b> {legend?.canton}</li>
                <li className="p-2 border-b border-gray-200"><b>Distrito:</b> {legend?.district}</li>
              </ul>
  
              <h5 className="mt-3 text-xl font-semibold">Fecha</h5>
              <p className="mt-2 mb-5">{relativeDate}</p>
  
              <PrimaryButton onClick={onNavigateBack}>
                Regresar
              </PrimaryButton>
            </>
          ) : (
            <p>Cargando...</p> 
          )}
        </div>
      </div>
    </>
  );  
};
