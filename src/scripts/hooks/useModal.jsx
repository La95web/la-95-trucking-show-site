import { useState } from 'react'; 

const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
}

export default useModal;
