import useModal from "../../../../scripts/hooks/useModal";
import styles from "./MultigalleryList.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import MultigalleryForm from "../../../forms/multimedia-form/MultigalleryForm";

const  MultigalleryList = ({ multigallery }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`multigallerys/${multigallery.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>

  {/* POSTER */}
  {/* POSTER */}
  {multigallery.poster && (
    <div className={styles.section}>
      <p>Poster</p>
      <img
        src={multigallery.poster}
        alt="Poster image"
        className={styles.image}
      />
    </div>
  )}

  {/* GALLERY */}
  {Array.isArray(multigallery.gallery) && multigallery.gallery.length > 0 && (
    <div className={styles.section}>
      <p>Galería</p>
      {multigallery.gallery.map((img, index) => (
        <img key={index} src={img} alt="Gallery image" className={styles.image} />
      ))}
    </div>
  )}

  {/* THUMBNAILS */}
  {Array.isArray(multigallery.thumbnails) && multigallery.thumbnails.length > 0 && (
    <div className={styles.section}>
      <p>Destacadas</p>
      {multigallery.thumbnails.map((img, index) => (
        <img key={index} src={img} alt="Thumbnail image" className={styles.image} />
      ))}
    </div>
  )}

  <div>
    <p>{new Date(multigallery.uploaded_at).toLocaleDateString()}</p>
  </div>

  <div>
    <button onClick={openModal}>Editar</button><br />
    <button onClick={handleDestroy}>Eliminar</button><br />
  </div>

  {isModalOpen && (
    <FullModal title={"Editar Multimedia"} onClose={closeModal}>
      <MultigalleryForm multigallery={multigallery} onCancel={closeModal} />
    </FullModal>
  )}

</li>

  );
};

export default MultigalleryList;
