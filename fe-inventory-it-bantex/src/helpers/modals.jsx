import { useState } from "react";

const Modals = () => {
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    take: false,
  });

  const showModal = (type) => {
    setModalState({ ...modalState, [type]: true });
  };

  const closeModal = (type) => {
    setModalState({ ...modalState, [type]: false });
  };

  return { modalState, showModal, closeModal };
};

export { Modals };
