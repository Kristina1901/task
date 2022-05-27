import PropTypes from 'prop-types';
import { useState } from 'react';
import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');
  const handleNameChange = event => {
    setImageName(event.target.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(imageName);
  };

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          placeholder="Your name"
          onChange={handleNameChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          placeholder="Email"
          onChange={handleNameChange}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          placeholder="Phone"
          onChange={handleNameChange}
        />
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
