import { FormEditModalStock } from "../../../molecules";

const EditItem = ({ isVisible, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;
  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      <FormEditModalStock onClose={onClose} />
    </section>
  );
};

export default EditItem;
