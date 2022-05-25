import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ userList }) {
  return (
    <ul>
      {userList.map(({ id, name, email, phone, position, photo }) => (
        <li key={id}>
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
