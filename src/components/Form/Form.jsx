import React from 'react';
import PropTypes from 'prop-types';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import validator from 'validator';
// import reactImageSize from 'react-image-size';
import Loader from 'components/Loader/Loader';
export default function Form({ positionList, updateListUsers }) {
  let fileField = document.querySelector('input[type="file"]');
  const [userData, setuserData] = useState({});
  const [statusInput, setstatusInput] = useState(true);
  const [statusInputName, setstatusInpuName] = useState(true);
  const [statusPhone, setstatusPhone] = useState(true);
  const [statusPhoto, setstatusPhoto] = useState(true);
  const [statusButton, setstatusButton] = useState(false);
  const [statusLoader, setstatusLoader] = useState('idle');
  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.name === 'photo' && value !== '') {
      const fileSize = fileField.files[0].size;
      if (validateSize(fileSize) === true) {
        setstatusPhoto(true);
        setuserData(prevState => ({
          ...prevState,
          photo: value,
        }));
      }
      if (validateSize(fileSize) === false) {
        setstatusPhoto(false);
      }
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
      if (value.length < 2 || value.length > 60) {
        setstatusInpuName(false);
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
  function validateSize(value) {
    if (value > 5242880) {
      setstatusPhoto(false);
      return false;
    } else {
      return true;
    }
  }

  function updateFormInput() {
    let formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('photo', fileField.files[0]);
    formData.append('position_id', userData.position_id);
    return formData;
  }
  async function getToken() {
    setstatusLoader('pending');
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
      setstatusLoader('idle');
      const { success, message } = data;
      if (success === true) {
        updateListUsers(true);
        toast(message);
      } else {
        toast.error(message);
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let { email, name, phone, position_id } = event.target.elements;
    getToken()
      .then(setuserData({}))
      .then(
        (email.value = ''),
        (name.value = ''),
        (phone.value = ''),
        setstatusButton(false),
        clearRadioButtons(position_id)
      );
    function clearRadioButtons(arr) {
      for (var i = 0; i < arr.length; i++) {
        let radioButton = arr[i];
        radioButton.checked = false;
      }
    }
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
              <span className={s.radioText}>{name}</span>
            </label>
          ))}
        </div>

        <div className={s.photoLoader}>
          <div className={statusPhoto === true ? s.thumb : s.thubmError}>
            <label className={s.textUpload}>
              <input
                id="files"
                type="file"
                className={s.inputLoad}
                onChange={handleInputChange}
                name="photo"
                accept=".jpg, .jpeg,"
              />
              Upload
            </label>
          </div>
          <input
            type="text"
            className={
              statusPhoto === true ? s.inputLoaderText : s.inputLoaderTextError
            }
            placeholder="Upload your photo"
            value={userData.hasOwnProperty('photo') ? userData.photo : ''}
            name="photoText"
            readOnly
          />
          {statusPhoto === false && (
            <span className={s.errorMessage}>size must not exceed 5MB</span>
          )}
        </div>
        <div className={s.btnThumb}>
          {statusLoader === 'pending' && <Loader />}
          {statusLoader !== 'pending' && (
            <button
              type="submit"
              className={statusButton === false ? s.signUp : s.button}
              disabled={statusButton === false ? true : false}
            >
              Sign up
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
Form.propTypes = {
  positionList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  updateListUsers: PropTypes.func.isRequired,
};
