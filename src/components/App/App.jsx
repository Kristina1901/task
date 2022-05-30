import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import { useEffect, useState } from 'react';
import s from 'components/App/App.module.css';
import stylebut from 'components/Button/Button.module.css';
import Section from 'components/Section/Section';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Form from 'components/Form/Form';
import Header from 'components/Header/Header';
import Hero from 'components/Hero/Hero';
import Title from 'components/Title/Title';
export default function App() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(true);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [positionList, setPositionList] = useState([]);
  async function showPosition() {
    let response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
    );
    if (response.status === 200) {
      let json = await response.json();
      return json;
    }

    throw new Error(response.status);
  }
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
              new Error(`Sorry, there are no users. Please try again.`)
            );
          }
        })
        .then(data => {
          const { users } = data;
          setUserList([...users]);
        });
      showPosition().then(data => {
        const { positions } = data;
        setPositionList(positions);
      });
    }
    if (page !== 1) {
      setValue(false);
      setStatus('pending');
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      )
        .then(response => {
          if (response.ok) {
            setStatus('resolved');
            setValue(true);
            return response.json();
          } else {
            setStatus('rejected');
            return Promise.reject(
              new Error(`Sorry, there are no users. Please try again.`)
            );
          }
        })
        .then(data => {
          const { users, total_pages } = data;
          setUserList(userList => [...userList, ...users]);
          if (total_pages === page) {
            setValue(false);
          }
        })
        .catch(error => setError(error) && setStatus('rejected'));
    }
  }, [page]);

  function handleIncrement() {
    setPage(page + 1);
  }
  return (
    <>
      <header>
        <Container>
          <Header />
        </Container>
      </header>
      <Section nameForClass={'sectionHero'}>
        <Hero />
      </Section>
      <Section nameForClass={'sectioncomment'}>
        <div className={s.wrap}>
          <Title name={'Working with GET request'} />
          <ImageGallery userList={userList} />
          {status === 'pending' && <Loader />}
          {value && (
            <Button
              name={'Show more'}
              handleIncrement={handleIncrement}
              style={stylebut.show}
            />
          )}
        </div>
      </Section>
      <Section nameForClass={'sectionpost'}>
        <Form positionList={positionList} />
      </Section>
      {status === 'rejected' && { error }}
    </>
  );
}
