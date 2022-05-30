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
          <a className={s.linkMail} href={'mailto:' + email}>
            {email}
            <span className={s.tooltiptextMail}>{email}</span>
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
