import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { LegendCard } from "../components/LegendCard";
import { getLegendByName } from "../services/apiService";

export const LegendSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const querySearch = queryString.parse(location.search);
  const { searchText, onInputChange } = useForm({
    searchText: querySearch.q || ""
  });

  const [legends, setLegends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (querySearch.q) {
      fetchLegends(querySearch.q);
    }
  }, [querySearch.q]);

  const fetchLegends = async (query) => {
    setLoading(true);
    const result = await getLegendByName(query);
    setLegends(result);
    setLoading(false);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const showSearch = !searchText && legends.length === 0;
  const showWarning = searchText && legends.length === 0 && !loading;

  return (
    <>
      <h1 className="text-xl font-bold p-4">Búsqueda</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/5 p-4">
          <form onSubmit={onSearchSubmit}>
            <h4 className="text-lg font-semibold">Buscar</h4>
            <input
              type="text"
              placeholder="Nombre, provincia, cantón o distrito"
              className="input input-bordered w-full max-w mt-2"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline btn-primary mt-4">
              Buscar
            </button>
          </form>
        </div>

        <div className="w-full md:w-3/5 p-4">
          <h4 className="text-lg font-semibold">Resultado</h4>

          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Búsqueda de leyendas costarricenses
          </div>

          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert"
            style={{ display: showWarning ? '' : 'none' }}
          >
            No se ha encontrado la leyenda
          </div>

          {loading && <div>Cargando...</div>}

          {legends.map((legend) => (
            <LegendCard key={legend.id} legend={legend} />
          ))}
        </div>
      </div>
    </>
  );
};