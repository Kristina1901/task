import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  name,
  email,
  phone,
  position,
  photo,
}) {
  return (
    <div>
      <img src={photo} alt={name} width="70" height="70" className={s.photo} />
      <p>{name}</p>
      <p>{position}</p>
      <p>
        <a href={'mailto:' + email}>{email}</a>
      </p>
      <p>
        <a href={'tel:' + phone}>{phone}</a>
      </p>
    </div>
  );
}
