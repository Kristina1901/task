import React from 'react';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import { useState } from 'react';
import validator from 'validator';
export default function Form({ positionList }) {
  const [userPhoto, setUserPhoto] = useState('');
  const [statusInput, setstatusInput] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [statusInputName, setstatusInpuName] = useState(true);
  const [statusPhone, setstatusPhone] = useState(true);
  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.name === 'photo') {
      setUserPhoto(value);
    }
    if (target.name === 'email') {
      if (validator.isEmail(value) !== true) {
        setstatusInput(false);
      } else {
        setstatusInput(true);
        setEmail(value);
      }
    }

    if (target.name === 'name') {
      if (
        validator.isFloat(value, 'uk-UA', { min: 2, max: 62 }) ||
        validator.isAlpha(value, 'uk-UA') !== true
      ) {
        setstatusInpuName(false);
      } else {
        setstatusInpuName(true);
        setName(value);
      }
    }
    if (target.name === 'phone') {
      if (validator.isMobilePhone(value, 'uk-UA') !== true) {
        setstatusPhone(false);
      } else {
        setstatusPhone(true);
        setPhone(value);
      }
    }
    if (target.type === 'radio') {
      setPosition(event.target.id);
    }
  }
  async function getToken() {
    let fileField = document.querySelector('input[type="file"]');
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', fileField.files[0]);
    formData.append('position_id', position);
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
      .then(token => registUser(token, formData));
  }
  async function registUser(key, obj) {
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
    getToken().then(setName(''));
  }

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form className={s.form} id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Your name"
          className={statusInputName === true ? s.input : s.invalidInput}
          name="name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Email"
          className={statusInput === true ? s.input : s.invalidInput}
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
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
          <button type="submit" className={s.signUp}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
