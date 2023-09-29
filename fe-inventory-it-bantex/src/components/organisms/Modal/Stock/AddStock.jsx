import FormAddModalStock from "../../../molecules/Form/FormAddModalStock";

const AddStock = ({ isVisible, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      <FormAddModalStock onClose={onClose} />
    </section>
  );
};

export default AddStock;
