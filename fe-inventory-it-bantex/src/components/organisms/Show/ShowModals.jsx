const ShowModal = ({ isVisible, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section
      className=" fixed inset-0 bg-slate-400 h-screen w-full bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      {children}
    </section>
  );
};

export default ShowModal;
