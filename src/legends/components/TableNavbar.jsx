import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components";

export const TableNavbar = () => {
  const navigate = useNavigate();
  
  const onCreateLegend = () => {
    navigate("/create");
  };

  return (
    <>
      <nav className="bg-base-100 p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0 md:flex-1 text-center md:text-left">
          <a className="text-lg font-bold">Listado de Leyendas</a>
        </div>
        
        <div className="md:flex-1 text-center md:text-right">
          <PrimaryButton onClick={onCreateLegend}>
            Agregar Leyenda
          </PrimaryButton>
        </div>
      </nav>
    </>
  );
};
