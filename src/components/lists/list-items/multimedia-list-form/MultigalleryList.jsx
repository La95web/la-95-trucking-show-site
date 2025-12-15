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
        {multigallery.thumbnail_url && <img src={multigallery.thumbnail_url} alt="Multimedia's thumbnail" className={styles.image} />}
        <div>
          <p>{new Date(multigallery.uploaded_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>
        <div>
          {/* <a href={`/admin/articles/${article.id}`} className={styles.link}>Ver Secciones</a><br /> */}
          <button onClick={openModal}>Editar</button><br />
          <button onClick={handleDestroy}>Eliminar</button><br />
        </div>
        {isModalOpen &&
          <FullModal title={"Editar Articulo"} onClose={closeModal}>
            <MultigalleryForm multigallery={multigallery} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default MultigalleryList;
