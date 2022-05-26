import s from 'components/Title/Title.module.css';
const Title = ({ name }) => (
  <div>
    <h1 className={s.header}>{name}</h1>
  </div>
);
export default Title;
