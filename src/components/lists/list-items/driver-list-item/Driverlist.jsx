import useModal from "../../../../scripts/hooks/useModal";
import styles from "./Driverlist.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import DriverForm from "../../../forms/driverjobs/DriverjobsForm";

const DriverList = ({ trucker }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`truckers/${trucker.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {trucker.thumbnail_url && <img src={trucker.thumbnail_url} alt="item's thumbnail" className={styles.image} />}
        <div>
          <h3>{trucker.company}</h3>
          <p>{trucker.description}</p>
          <p>{new Date(trucker.uploaded_at).toLocaleDateString(undefined, {
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
            <DriverForm trucker={trucker} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default DriverList;
