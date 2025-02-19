import useModal from "../../../../scripts/hooks/useModal";
import styles from "./ArticlesListItem.module.scss";
import destroy from "../../../../scripts/api/destroy";
import FullModal from "../../../modals/full-modal/FullModal";
import ArticleForm from "../../../forms/article-form/ArticleForm";

const ArticlesListItem = ({ article }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDestroy = async () => await destroy(`articles/${article.id}`)
    .then(() => window.location.reload())
    .catch((error) => alert(error));

  return (
    <li className={styles['list-item']}>
        {article.thumbnail_url && <img src={article.thumbnail_url} alt="Article's thumbnail" className={styles.image} />}
        <div>
          <h3>{article.title}</h3>
          <p>{article.type}</p>
          <p>{new Date(article.uploaded_at).toLocaleDateString(undefined, {
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
            <ArticleForm article={article} onCancel={closeModal} />
          </FullModal>
        }
      </li>
  );
};

export default ArticlesListItem;