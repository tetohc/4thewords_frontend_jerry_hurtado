import PropTypes from 'prop-types';

export const PrimaryButton = ({ onClick, children }) => {
  return (
    <button
      className="btn btn-outline btn-primary"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};