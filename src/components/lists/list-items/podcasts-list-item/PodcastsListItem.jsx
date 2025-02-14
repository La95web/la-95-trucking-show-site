import destroy from "../../../../scripts/api/destroy";
import useModal from "../../../../scripts/hooks/useModal";
import PodcastForm from "../../../forms/podcast-form/PodcastForm";
import FullModal from "../../../modals/full-modal/FullModal";

const PodcastsListItem = ({ podcast }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const handleDestroy = async () => await destroy(`podcasts/${podcast.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li>
      <h2>{podcast.title}</h2>
      <p>{new Date(podcast.uploaded_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}</p>
      <button type="button" onClick={openModal}>Editar</button>
      <button type="button" onClick={handleDestroy}>Eliminar</button>
      {isModalOpen &&
        <FullModal title="Editar Podcast" onClose={closeModal}>
          <PodcastForm podcast={podcast} onCancel={closeModal} />
        </FullModal>
      }
    </li>
  );
};

export default PodcastsListItem;
