import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  name,
  email,
  phone,
  position,
  photo,
}) {
  return (
    <div className={s.container}>
      <img src={photo} alt={name} width="70" height="70" className={s.photo} />
      <p className={s.name}>{name}</p>
      <div className={s.info}>
        <p className={s.occupation}>{position}</p>
        <p className={s.mail}>
          <a href={'mailto:' + email}>{email}</a>
        </p>
        <p className={s.phone}>
          <a href={'tel:' + phone}>{phone}</a>
        </p>
      </div>
    </div>
  );
}
