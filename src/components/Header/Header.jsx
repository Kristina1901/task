import Button from 'components/Button/Button';
import s from 'components/Header/Header.module.css';
import pict from 'components/Header/logo.svg';
import text from 'components/Header/labe.svg';
import stylebut from 'components/Button/Button.module.css';
export default function Header() {
  return (
    <div className={s.container}>
      <a className={s.link} href="index.html">
        <img src={pict} alt="logo" width="39" height="26" />
        <img src={text} alt="logo" width="64" height="11" />
      </a>
      <div className={s.buttonsContainer}>
        <button className={stylebut.button}>Users</button>
        <button className={stylebut.button}>Sign up</button>
      </div>
    </div>
  );
}
