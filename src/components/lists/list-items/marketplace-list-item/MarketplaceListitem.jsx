import useModal from "../../../../scripts/hooks/useModal";
import styles from "./MarketpalceListItem.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import MarketplacetForm from "../../../forms/market-form/Marketplaceform";

const MarketplaceListitem = ({ marketplace }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`marketplaces/${marketplace.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {marketplace.thumbnail_url && <img src={marketplace.thumbnail_url} alt="item's thumbnail" className={styles.image} />}
        <div>
          <h3>{marketplace.title}</h3>
          <p>{marketplace.type}</p>
          <p>{new Date(marketplace.uploaded_at).toLocaleDateString(undefined, {
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
            <MarketplacetForm marketplace={marketplace} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default MarketplaceListitem;