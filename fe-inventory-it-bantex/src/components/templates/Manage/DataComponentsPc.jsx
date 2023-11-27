import { useState } from "react";
import { TablePcLine } from "../../molecules";
import { FormAddCompPc2, FormLostConnect } from "../../molecules";
import {
  BiDetail,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { TitleTable } from "../../atoms";
import { ShowTable, TableBody, TableHeader, ShowModal } from "../../organisms";

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
        <section className="w-full cards backdrop-blur-md rounded-xl flex justify-center items-center flex-col">
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
        <ShowTable gap={6}>
          <TableHeader>
            <TitleTable count={dataPcComponent.length}>Komponen </TitleTable>
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
          </TableHeader>
          <TableBody>
            <TablePcLine data={dataPcComponent} />
          </TableBody>
        </ShowTable>
      )}
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddCompPc2
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
          pcInput={formValues.pc_no}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormLostConnect
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          pcInput={formValues.pc_no}
        />
      </ShowModal>
    </>
  );
};

export default DataComponentsPc;
