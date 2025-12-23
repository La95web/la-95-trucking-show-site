import useModal from "../../../../scripts/hooks/useModal";
import styles from "./Softball2024List.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import Softball2024Form from "../../../forms/softball2024/Softball2024Form";

const  Softball2024List = ({ softball2024 }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`softball2024s/${softball2024.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
    {/* POSTER */}
    {softball2024.poster && (
      <div className={styles.section}>
        <p>Poster</p>
        <img
          src={softball2024.poster}
          alt="Poster image"
          className={styles.image}
        />
      </div>
    )}
    {/* GALLERY */}
    {Array.isArray(softball2024.gallery) && softball2024.gallery.length > 0 && (
      <div className={styles.section}>
        <p>Galería</p>
        {softball2024.gallery.map((img, index) => (
          <img key={index} src={img} alt="Gallery image" className={styles.image} />
        ))}
      </div>
    )}
    {/* THUMBNAILS */}
    {Array.isArray(softball2024.thumbnails) && softball2024.thumbnails.length > 0 && (
      <div className={styles.section}>
        <p>Destacadas</p>
        {softball2024.thumbnails.map((img, index) => (
          <img key={index} src={img} alt="Thumbnail image" className={styles.image} />
        ))}
      </div>
    )}
    <div>
      <p>{new Date(softball2024.uploaded_at).toLocaleDateString()}</p>
    </div>
    <div>
      <button onClick={openModal}>Editar</button><br />
      <button onClick={handleDestroy}>Eliminar</button><br />
    </div>

    {isModalOpen && (
      <FullModal title={"Editar Multimedia"} onClose={closeModal}>
        <Softball2024Form softball2024={softball2024} onCancel={closeModal} />
      </FullModal>
    )}
  </li>
  );
};

export default Softball2024List;

