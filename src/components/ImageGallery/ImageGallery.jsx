import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from 'components/ImageGallery/ImageGallery.module.css';
export default function ImageGallery({ userList }) {
  return (
    <ul className={s.list}>
      {userList.map(({ id, name, email, phone, position, photo }) => (
        <li key={id} className={s.item}>
          <ImageGalleryItem
            id={id}
            photo={photo}
            name={name}
            email={email}
            phone={phone}
            position={position}
          />
        </li>
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })
  ),
};
