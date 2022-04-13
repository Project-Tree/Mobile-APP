import { useState, useCallback } from 'react';

const useModal = (): [boolean, () => void, () => void] => {
  const [madalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return [madalOpen, openModal, closeModal];
};

export default useModal;
