import { useState } from "react";
import Title from "../../atoms/Text/Title";
import { TablePcLine } from "../../molecules";
import ShowModal from "../../organisms/ShowModal";
import FormAddModalComponentPc from "../../molecules/Form/PC/FormAddModalComponentPc";
import FormAddModalComponentPc2 from "../../molecules/Form/PC/FormAddModalComponentPc2";
import FormLostConnection from "../../molecules/Form/PC/FormLostConnection";
import {
  BiDetail,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";
import { NavLink } from "react-router-dom";

const DataComponentsPc = ({ dataPcComponent, formValues, setIsLoading }) => {
  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      {dataPcComponent.length === 0 ? (
        <section className="w-full min-h-[100px] bg-slate-400 backdrop-blur-md rounded-3xl flex justify-center items-center flex-col">
          <Title>Belum ada komponen</Title>
          <div className="flex gap-2">
            <button className="button">Tambah Komponen</button>
            <button className="button">Detail Komponen</button>
          </div>
        </section>
      ) : (
        <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
          <section className="table__header">
            <Title>komponen {formValues.pc_description}</Title>
            <div className="flex gap-2">
              <NavLink to={`unused`} className="button">
                <BiDetail />
              </NavLink>
              <button onClick={() => setAddModal(true)} className="button">
                <BsDatabaseFillAdd />
              </button>
              <button onClick={() => setDeleteModal(true)} className="button">
                <MdDelete />
              </button>
            </div>
          </section>
          <section className="table__body">
            <TablePcLine data={dataPcComponent} />
          </section>
        </section>
      )}
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalComponentPc2
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
          pcInput={formValues.pc_description}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormLostConnection
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          pcInput={formValues.pc_no}
        />
      </ShowModal>
    </>
  );
};

export default DataComponentsPc;
