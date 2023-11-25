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
const ShowTable = ({ children, gap }) => {
  return (
    <section
      className={`col-span-${gap} cards rounded-xl min-h-[50px] h-[75vh]`}
    >
      {children}
    </section>
  );
};

const ShowContent = ({ children, placeSelf, col, padding, gap }) => {
  const start = "start";
  return (
    <section
      className={`place-self-${placeSelf || start} flex cards gap-${
        gap || 2
      } p-${padding || 2} col-span-${col || 6}`}
    >
      {children}
    </section>
  );
};

export { ShowModal, ShowTable, ShowContent };
