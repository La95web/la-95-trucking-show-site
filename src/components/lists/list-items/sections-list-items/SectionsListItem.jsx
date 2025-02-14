import useModal from '../../../../scripts/hooks/useModal';
import FullModal from '../../../modals/full-modal/FullModal';
import SectionForm from '../../../forms/section-form/SectionForm';
import destroy from '../../../../scripts/api/destroy';
import styles from './SectionsListItem.module.scss';

const ListItem = ({ section }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`sections/${section.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li>
      <h2>{section.heading}</h2>
      {section.image_url && <img src={section.image_url} alt={section.heading} className={styles.image} />}
      <p>{section.body}</p>
      <button onClick={openModal}>Editar</button>
      <button onClick={handleDestroy}>Eliminar</button>
      {isModalOpen &&
        <FullModal title={"New Section"} onClose={closeModal}>
          <SectionForm section={section} onCancel={closeModal} />
        </FullModal>
      }
    </li>
  );
};

export default ListItem;