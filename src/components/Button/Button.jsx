import PropTypes from 'prop-types';
const Button = ({ name, handleIncrement, style }) => (
  <button
    type="button"
    className={style}
    onClick={() => {
      handleIncrement();
    }}
  >
    {name}
  </button>
);
export default Button;
Button.propTypes = {
  handleIncrement: PropTypes.func,
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};
