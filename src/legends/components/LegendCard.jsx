import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const LegendCard = ({ legend }) => {
  return (
    <div className="w-full p-2">
      <article className="bg-transparent shadow-md rounded overflow-hidden flex-grow">
        <div className="flex">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={`data:image/png;base64,${legend?.imageUrl}`}
              className="h-48 w-96 object-cover"
              alt={legend.name}
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="p-4">
              <h2 className="text-xl font-bold">{legend.name}</h2>
              <p className="text-base">{legend.description}</p>
              <p className="text-base">
                <small className="text-gray-500">{legend.category}</small>
              </p>

              <div className="badge badge-secondary">
                <Link to={`/legend/${legend.id}`}>Más...</Link>
              </div>

              <div className="card-actions justify-end">
                <div className="badge badge-outline">{legend.province}</div>
                <div className="badge badge-outline">{legend.canton}</div>
                <div className="badge badge-outline">{legend.district}</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

LegendCard.propTypes = {
  legend: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    canton: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
  }).isRequired,
};
