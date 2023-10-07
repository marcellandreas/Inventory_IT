import Title from "../../atoms/Text/Title";
import { TablePcLine } from "../../molecules";

const DataComponentsPc = ({ dataPcComponent, formValues }) => {
  return (
    <>
      {dataPcComponent.length === 0 ? (
        <section className="w-full min-h-[100px] bg-slate-400 backdrop-blur-md rounded-3xl flex justify-center items-center flex-col">
          <Title>Data Belum Tersedia</Title>
          <button className="button">Tambah Komponen</button>
        </section>
      ) : (
        <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
          <section className="table__header">
            <Title>komponen {formValues.pc_description}</Title>
            <div className="flex gap-2">
              <button
                //  onClick={() => {
                //    setAddModal(true);
                //  }}
                className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
              >
                Tambah komponen
              </button>
              <button className="button">Edit</button>
              <button className="button">Delete</button>
            </div>
          </section>
          <section className="table__body">
            <TablePcLine data={dataPcComponent} />
          </section>
        </section>
      )}
    </>
  );
};

export default DataComponentsPc;
