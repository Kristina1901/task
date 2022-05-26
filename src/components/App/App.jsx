import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import { useEffect, useState } from 'react';
import s from 'components/App/App.module.css';
import style from 'components/Section/Section.module.css';
import pict from 'components/App/logo.svg';
import text from 'components/App/labe.svg';
import Section from 'components/Section/Section';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
export default function App() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(true);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (page === 1) {
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(
              new Error(
                `Sorry, there are no images matching your search query. Please try again.`
              )
            );
          }
        })
        .then(data => {
          const { users } = data;
          setUserList([...users]);
        });
    }
    if (page !== 1) {
      setStatus('pending');
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      )
        .then(response => {
          if (response.ok) {
            setStatus('resolved');
            return response.json();
          } else {
            setStatus('rejected');
            return Promise.reject(
              new Error(
                `Sorry, there are no images matching your search query. Please try again.`
              )
            );
          }
        })
        .then(data => {
          const { users, total_pages } = data;
          setUserList(userList => [...userList, ...users]);
          if (total_pages === page) {
            setValue(false);
          }
        });
    }
  }, [page]);

  function handleIncrement() {
    setPage(page + 1);
  }
  return (
    <>
      <header>
        <Container>
          <div className={s.container}>
            <a className={s.link} href="index.html">
              <img src={pict} alt="logo" width="39" height="26" />
              <img src={text} alt="logo" width="64" height="11" />
            </a>
            <div className={s.buttonsContainer}>
              <Button name={'Users'} />
              <Button name={'Sign up'} />
            </div>
          </div>
        </Container>
      </header>
      <Section nameForClass={'sectionHero'}>
        <div className={style.container}>
          <div className={s.wrapperText}>
            <h1 className={s.header}>
              Test assignment for front-end developer
            </h1>
            <p className={s.paragraf}>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <Button name={'Sign up'} />
          </div>
        </div>
      </Section>
      <Section nameForClass={'sectioncomment'}>
        <Container>
          <h1 className={s.headerComments}>Working with GET request</h1>
          <ImageGallery userList={userList} />
          {status === 'pending' && <Loader />}
          {value && (
            <Button name={'Show more'} handleIncrement={handleIncrement} />
          )}
        </Container>
      </Section>
    </>
  );
}
