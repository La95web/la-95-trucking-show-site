import useModal from "../../../../scripts/hooks/useModal";
import styles from "./DistpacherList.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import DistpacherForm from "../../../forms/distpacher-form/DistpacherForm";

const DistpacherList = ({ distpacher }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`distpachers/${distpacher.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {distpacher.thumbnail_url && <img src={distpacher.thumbnail_url} alt="item's thumbnail" className={styles.image} />}
        <div>
          <h3>{distpacher.company}</h3>
          <p>{distpacher.description}</p>
          <p>{new Date(distpacher.uploaded_at).toLocaleDateString(undefined, {
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
            <DistpacherForm distpacher={distpacher} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default DistpacherList;
