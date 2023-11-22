const ShowTable = ({ children, gap }) => {
  return (
    <section
      className={`col-span-${gap} cards rounded-xl min-h-[50px] h-[75vh]`}
    >
      {children}
    </section>
  );
};

export default ShowTable;
