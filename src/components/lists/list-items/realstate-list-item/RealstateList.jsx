import useModal from "../../../../scripts/hooks/useModal";
import styles from "./RealstateList.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import RealstateForm from "../../../forms/realstate-form/RealstateForm";

const RealstateList = ({ realstate }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`realstates/${realstate.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {realstate.thumbnail_url && <img src={realstate.thumbnail_url} alt="item's thumbnail" className={styles.image} />}
        <div>
          <h3>{realstate.company}</h3>
          <p>{realstate.description}</p>
          <p>{new Date(realstate.uploaded_at).toLocaleDateString(undefined, {
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
            <RealstateForm realstate={realstate} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default RealstateList;