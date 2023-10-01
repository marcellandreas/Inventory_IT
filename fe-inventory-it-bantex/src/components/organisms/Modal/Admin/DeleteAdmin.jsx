const DeleteAdmin = ({ isVisible, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;
  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      {/* <FormDeleteModalStock onClose={onClose} /> */}
    </section>
  );
};

export default DeleteAdmin;
