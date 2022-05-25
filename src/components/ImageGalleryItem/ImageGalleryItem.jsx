export default function ImageGalleryItem({
  name,
  email,
  phone,
  position,
  photo,
}) {
  return (
    <div>
      <img src={photo} alt={name} />
      <p>{name}</p>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}
