import stylebut from 'components/Button/Button.module.css';
import s from 'components/Hero/Hero.module.css';
import { animateScroll as scroll } from 'react-scroll';
export default function Hero() {
  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };
  return (
    <div className={s.container}>
      <div className={s.wrapperText}>
        <h1 className={s.header}>Test assignment for front-end developer</h1>
        <p className={s.paragraf}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className={stylebut.button} onClick={scrollToBottom}>
          Sign up
        </button>
      </div>
    </div>
  );
}
