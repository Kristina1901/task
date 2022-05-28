import React from 'react';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import { useState } from 'react';
import validator from 'validator';
export default function Form({ positionList, onSubmit }) {
  const [userForm, setUserForm] = useState(null);
  const [userPhoto, setUserPhoto] = useState('');
  const [userPhotoAdress, setuserPhotoAdress] = useState('');
  const [name, setName] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [position, setPosition] = useState({});
  const [statusInput, setstatusInput] = useState(true);
  const [statusInputName, setstatusInpuName] = useState(true);
  const [statusPhone, setstatusPhone] = useState(true);
  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.name === 'photo') {
      setUserPhoto(value);
      setuserPhotoAdress({ photo: value });
    }
    if (target.name === 'email') {
      if (validator.isEmail(value) !== true) {
        setstatusInput(false);
      } else {
        setstatusInput(true);
        setEmail({ name: value });
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
        setName({ name: value });
      }
    }
    if (target.name === 'phone') {
      if (validator.isMobilePhone(value, 'uk-UA') !== true) {
        setstatusPhone(false);
      } else {
        setstatusPhone(true);
        setPhone({ phone: value });
      }
    }
    if (target.type === 'radio') {
      setPosition({ position: event.target.id });
    }
  }
  const handleSubmit = event => {
    event.preventDefault();
    setUserForm([userPhotoAdress, name, email, phone, position]);
    onSubmit(userForm);
  };

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form className={s.form} onSubmit={handleSubmit}>
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
                name="position"
                value={name}
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
