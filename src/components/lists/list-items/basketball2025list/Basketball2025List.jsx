import useModal from "../../../../scripts/hooks/useModal";
import styles from "./Softball2024List.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import Basketball2025Form from "../../../forms/basketball2025/BasketballFormForm";

const  Basketball2025List = ({ basketball2025 }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`softball2024s/${basketball2025.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
    {/* POSTER */}
    {basketball2025.poster && (
      <div className={styles.section}>
        <p>Poster</p>
        <img
          src={basketball2025.poster}
          alt="Poster image"
          className={styles.image}
        />
      </div>
    )}
    {/* GALLERY */}
    {Array.isArray(basketball2025.gallery) && basketball2025.gallery.length > 0 && (
      <div className={styles.section}>
        <p>Galería</p>
        {basketball2025.gallery.map((img, index) => (
          <img key={index} src={img} alt="Gallery image" className={styles.image} />
        ))}
      </div>
    )}
    {/* THUMBNAILS */}
    {Array.isArray(basketball2025.thumbnails) && basketball2025.thumbnails.length > 0 && (
      <div className={styles.section}>
        <p>Destacadas</p>
        {basketball2025.thumbnails.map((img, index) => (
          <img key={index} src={img} alt="Thumbnail image" className={styles.image} />
        ))}
      </div>
    )}
    <div>
      <p>{new Date(basketball2025.uploaded_at).toLocaleDateString()}</p>
    </div>
    <div>
      <button onClick={openModal}>Editar</button><br />
      <button onClick={handleDestroy}>Eliminar</button><br />
    </div>

    {isModalOpen && (
      <FullModal title={"Editar Multimedia"} onClose={closeModal}>
        <Basketball2025Form basketball2025={basketball2025} onCancel={closeModal} />
      </FullModal>
    )}
  </li>
  );
};

export default Basketball2025List;
