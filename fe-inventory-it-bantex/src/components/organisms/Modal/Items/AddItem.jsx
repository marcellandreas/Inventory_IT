import { FormAddModalItem } from "../../../molecules";

const AddItem = ({ isVisible, onClose, setIsLoading }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      <FormAddModalItem onClose={onClose} setIsLoading={setIsLoading} />
    </section>
  );
};

export default AddItem;
