import { FormAddModalStock } from "../../../molecules";

const AddStock = ({ isVisible, onClose, setIsLoading }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      <FormAddModalStock onClose={onClose} setIsLoading={setIsLoading} />
    </section>
  );
};

export default AddStock;
