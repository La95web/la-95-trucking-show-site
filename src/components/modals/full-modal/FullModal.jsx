import styles from './FullModal.module.scss';

const FullModal = ({ children, title, onClose }) => {
  const handleClick = (event) => event.stopPropagation();

  return (
    <div onClick={onClose} className={styles.backdrop}>
      <div onClick={handleClick} className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default FullModal;
