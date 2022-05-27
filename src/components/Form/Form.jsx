import React from 'react';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import { useState } from 'react';
import validator from 'validator';
export default function Form({ positionList, onSubmit }) {
  const [userForm, setUserForm] = useState([]);
  const [userPhoto, setUserPhoto] = useState('');

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setUserForm(useform => {
      return [...useform, { [target.name]: value }];
    });
    if (target.name === 'photo') {
      setUserPhoto(value);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(userForm);
    setUserForm([]);
    setUserPhoto('');
  };

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form
        className={s.form}
        action=" https://frontend-test-assignment-api.abz.agency/api/v1/users"
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Your name"
          className={s.input}
          name="name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Email"
          className={s.input}
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Phone"
          className={s.input}
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
                name="positiont"
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
