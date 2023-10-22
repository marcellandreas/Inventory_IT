import { useState } from "react";
import { TablePcLine } from "../../molecules";
import ShowModal from "../../organisms/ShowModal";
// import FormAddModalComponentPc from "../../molecules/Form/PC/FormAddModalComponentPc";
import FormAddModalComponentPc2 from "../../molecules/Form/PC/FormAddModalComponentPc2";
import FormLostConnection from "../../molecules/Form/PC/FormLostConnection";
import {
  BiDetail,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { TitleTable } from "../../atoms";

const DataComponentsPc = ({
  dataPcComponent,
  formValues,
  setIsLoading,
  pcno,
}) => {
  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      {dataPcComponent.length === 0 ? (
        <section className="w-full min-h-[100px] bg-slate-400 backdrop-blur-md rounded-3xl flex justify-center items-center flex-col">
          <TitleTable>Belum ada komponen</TitleTable>
          <div className="flex gap-2">
            <NavLink to={`add-components?pc_no=${pcno}`} className="button">
              Tambah Komponen
            </NavLink>
            <NavLink to={`unused`} className="button">
              Detail Komponen
            </NavLink>
          </div>
        </section>
      ) : (
        <section className="w-[82vw] overflow-hidden min-h-[100px] bg-slate-300 backdrop-blur-md rounded-3xl">
          <section className="table__header rounded-3xl">
            <TitleTable>komponen {formValues.pc_description}</TitleTable>
            <div className="flex gap-2">
              <NavLink to={`unused`} className="button">
                <BiDetail />
              </NavLink>
              <NavLink to={`add-components?pc_no=${pcno}`} className="button">
                <BsDatabaseFillAdd />
              </NavLink>
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
          pcInput={formValues.pc_no}
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
