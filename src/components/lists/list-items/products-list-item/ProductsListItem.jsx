import useModal from "../../../../scripts/hooks/useModal";
import styles from "./ProductsListItem.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import ProductForm from "../../../forms/product-form/ProductForm";

const ProductsListItem = ({ index, product }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`products/${product.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={[styles.item, index % 2 !== 0 && styles.odd].join(' ')}>
      {product.main_image_url && <img src={product.main_image_url} alt={product.title} className={styles.image} />}
      <div>
        <h3>{product.title}</h3>
        <p>{product.stripe_id}</p>
        <p>USD $ {(product.price / 100).toFixed(2)}</p>
      </div>
      <div>
        <button onClick={openModal}>Editar</button><br />
        <button onClick={handleDestroy}>Eliminar</button><br />
      </div>
      {isModalOpen &&
        <FullModal title={"Editar Producto"} onClose={closeModal}>
          <ProductForm product={product} onCancel={closeModal} />
        </FullModal>
      }
    </li>
  );
};

export default ProductsListItem;
