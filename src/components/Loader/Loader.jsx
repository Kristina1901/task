import { Oval } from 'react-loader-spinner';
import s from 'components/Loader/Loader.module.css';
const Loader = () => (
  <div className={s.container}>
    <Oval height="48" width="48" color="#00BDD3" />
  </div>
);

export default Loader;
