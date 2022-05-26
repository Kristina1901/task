import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from 'components/ImageGallery/ImageGallery.module.css';
export default function ImageGallery({ userList }) {
  return (
    <ul>
      {userList.map(({ id, name, email, phone, position, photo }) => (
        <li key={id} className={s.item}>
          <ImageGalleryItem
            id={id}
            name={name}
            email={email}
            phone={phone}
            position={position}
            photo={photo}
          />
        </li>
      ))}
    </ul>
  );
}
