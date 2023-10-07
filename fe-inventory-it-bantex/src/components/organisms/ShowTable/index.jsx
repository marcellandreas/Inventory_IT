const ShowTable = ({ children, formValues, setAddModal }) => {
  return (
    <>
      <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md rounded-3xl">
        <section className="table__header">
          <h1 className="font-semibold text-md">
            komponen {formValues.pc_description}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAddModal(true);
              }}
              className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
            >
              Tambah komponen
            </button>
            <button className="button">Edit</button>
            <button className="button">Delete</button>
          </div>
        </section>
        <section className="table__body">{children}</section>
      </section>
    </>
  );
};

export default ShowTable;
