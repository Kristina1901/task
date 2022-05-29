import s from 'components/Title/Title.module.css';
const Title = ({ name }) => (
  <div>
    <h2 className={s.header}>{name}</h2>
  </div>
);
export default Title;
