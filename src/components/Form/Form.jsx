import s from 'components/Form/Form.module.css';
import Title from 'components/Title/Title';
import Button from 'components/Button/Button';
import stl from 'components/Button/Button.module.css';
import validator from 'validator';
export default function Form({ positionList }) {
  // const handleNameChange = event => {
  //   setImageName(event.target.value.toLowerCase());
  // };
  // const handleSubmit = event => {
  //   event.preventDefault();

  //   onSubmit(imageName);
  // };

  return (
    <div className={s.post}>
      <Title name={'Working with POST request'} />
      <form
        className={s.form}
        action=" https://frontend-test-assignment-api.abz.agency/api/v1/users"
        method="post"
      >
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Your name"
          className={s.input}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Email"
          className={s.input}
        />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Phone"
          className={s.input}
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
              />
              {name}
            </label>
          ))}
        </div>

        <div className={s.photoLoader}>
          <div className={s.thumb}>
            <label className={s.textUpload}>
              <input id="files" type="file" className={s.inputLoad} />
              Upload
            </label>
          </div>
          <input
            type="text"
            className={s.inputLoaderText}
            placeholder="Upload your photo"
          />
        </div>
        <div className={s.btnThumb}>
          <Button name={'Sign up'} style={stl.signUp} />
        </div>
      </form>
    </div>
  );
}
