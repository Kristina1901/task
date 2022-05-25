import s from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ name, handleIncrement }) => (
  <button
    type="button"
    className={s.button}
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
};
