import useModal from "../../../../scripts/hooks/useModal";
import styles from "./OwnerList.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import OwnerForm from "../../../forms/owner-form/OwnerForm";

const OwnerList = ({ owner }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`owners/${owner.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {owner.thumbnail_url && <img src={owner.thumbnail_url} alt="item's thumbnail" className={styles.image} />}
        <div>
          <h3>{owner.company}</h3>
          <p>{owner.description}</p>
          <p>{new Date(owner.uploaded_at).toLocaleDateString(undefined, {
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
            <OwnerForm owner={owner} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default OwnerList;