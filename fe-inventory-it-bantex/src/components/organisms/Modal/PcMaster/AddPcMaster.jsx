import { FormAddModalPcMaster } from "../../../molecules";

const AddPcMaster = ({ isVisible, onClose, setIsLoading }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section className="modal-component" id="wrapper" onClick={handleClose}>
      <FormAddModalPcMaster onClose={onClose} setIsLoading={setIsLoading} />
    </section>
  );
};

export default AddPcMaster;
