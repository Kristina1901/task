import React from 'react';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import { useState, useEffect } from 'react';
import validator from 'validator';
export default function Form({ positionList }) {
  const [userData, setuserData] = useState({});
  const [userPhoto, setUserPhoto] = useState('');
  const [statusInput, setstatusInput] = useState(true);
  const [statusInputName, setstatusInpuName] = useState(true);
  const [statusPhone, setstatusPhone] = useState(true);
  const [statusButton, setstatusButton] = useState(false);
  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.name === 'photo') {
      setUserPhoto(value);
      setuserData(prevState => ({
        ...prevState,
        photo: value,
      }));
    }
    if (target.name === 'email') {
      if (validator.isEmail(value) !== true) {
        setstatusInput(false);
      } else {
        setstatusInput(true);
        setuserData(prevState => ({
          ...prevState,
          email: value,
        }));
      }
    }

    if (target.name === 'name') {
      if (
        !validator.isAlpha(value, 'uk-UA') &&
        !validator.isAlpha(value, 'es-ES')
      ) {
        setstatusInpuName(false);
      } else {
        setstatusInpuName(true);
        setuserData(prevState => ({
          ...prevState,
          name: value,
        }));
      }
    }
    if (target.name === 'phone') {
      if (validator.isMobilePhone(value, 'uk-UA') !== true) {
        setstatusPhone(false);
      } else {
        setstatusPhone(true);
        setuserData(prevState => ({
          ...prevState,
          phone: value,
        }));
      }
    }
    if (target.type === 'radio') {
      setuserData(prevState => ({
        ...prevState,
        position_id: event.target.id,
      }));
    }
  }
  useEffect(() => {
    if (Object.keys(userData).length === 5) {
      setstatusButton(true);
    }
    if (Object.keys(userData).length === 0) {
      return;
    }
  }, [userData]);
  function updateFormInput() {
    let fileField = document.querySelector('input[type="file"]');
    let formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('photo', fileField.files[0]);
    formData.append('position_id', userData.position_id);
    return formData;
  }
  async function getToken() {
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`)
      .then(response => {
        if (response.ok) {
          let data = response.json();
          return data;
        } else {
          return Promise.reject(new Error(`Sorry, please try again.`));
        }
      })
      .then(data => {
        const { token } = data;
        return token;
      })
      .then(token => registerUser(token, updateFormInput()));
  }
  async function registerUser(key, obj) {
    let response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users',
      {
        method: 'POST',
        body: obj,

        headers: {
          Token: key,
        },
      }
    );
    response.json().then(data => {
      console.log(data);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    getToken();
  }

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form className={s.form} id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Your name"
          className={statusInputName === true ? s.input : s.invalidInput}
          name="name"
          onChange={handleInputChange}
          minLength="2"
          maxLength="62"
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          className={statusInput === true ? s.input : s.invalidInput}
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="tel"
          autoComplete="off"
          placeholder="Phone"
          className={statusPhone === true ? s.input : s.invalidInput}
          name="phone"
          onChange={handleInputChange}
        />
        <span className={s.exphone}>+38 (XXX) XXX - XX - XX</span>
        <p className={s.text}>Select your position</p>
        <div className={s.radio}>
          {positionList.map(({ id, name }) => (
            <label key={id} className={s.label}>
              <input
                type="radio"
                name="position_id"
                value={id}
                id={id}
                className={s.radioInput}
                onChange={handleInputChange}
              />
              {name}
            </label>
          ))}
        </div>

        <div className={s.photoLoader}>
          <div className={s.thumb}>
            <label className={s.textUpload}>
              <input
                id="files"
                type="file"
                className={s.inputLoad}
                onChange={handleInputChange}
                name="photo"
              />
              Upload
            </label>
          </div>
          <input
            type="text"
            className={s.inputLoaderText}
            placeholder="Upload your photo"
            defaultValue={userPhoto}
          />
        </div>
        <div className={s.btnThumb}>
          <button
            type="submit"
            className={statusButton === false ? s.signUp : s.button}
            disabled={statusButton === false ? true : false}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
