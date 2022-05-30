import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  name,
  email,
  phone,
  position,
  photo,
}) {
  let arr = [];
  while (email.length > 20) {
    arr.push(email.slice(0, 20));
    email = email.slice(20);
  }
  arr.push(email);

  let mail = arr.join('\n');
  return (
    <div className={s.container}>
      <img src={photo} alt={name} width="70" height="70" className={s.photo} />
      <p className={s.name}>{name}</p>
      <div className={s.info}>
        <p className={s.occupation}>{position}</p>
        <p className={s.mail}>
          <a className={s.linkMail} href={'mailto:' + email}>
            {mail}
            <span className={s.tooltiptextMail}>{mail}</span>
          </a>
        </p>
        <p className={s.phone}>
          <a href={'tel:' + phone} className={s.linkPhone}>
            {phone}
            <span className={s.tooltiptextPhone}>{phone}</span>
          </a>
        </p>
      </div>
    </div>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
