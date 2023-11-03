import { useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalItem,
  FormDeleteModalItem,
  FormEditModalItem,
  TableItems,
} from "../../components/molecules";
import { BsDatabaseFillAdd } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { TableBody, TableHeader, ShowModal } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";
import { generateDynamicContent } from "../../components/templates/GenerateDynamicContent";
import { useFetchItems } from "../../config/GetData";
import FormTakeModalItem from "../../components/molecules/Form/Items/FormTakeModalItem";

const ItemsPage = () => {
  const [id, setId] = useState("");
  const dataItems = useFetchItems();
  const { modalState, showModal, closeModal } = Modals();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataItems, search);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="container mx-auto flex flex-col gap-5 items-center">
            <div className="flex gap-2 self-start">
              <NavLink
                to={`/barcode`}
                className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
              >
                Cetak barcode
              </NavLink>
              <NavLink
                to={`/qrcode`}
                className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
              >
                Cetak qrcode
              </NavLink>
            </div>
            <section className="grid grid-cols-6 h-[75vh] w-full  gap-4 grid-flow-dense">
              <div className="bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6">
                <TableHeader>
                  <TitleTable>Data Barang</TitleTable>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
                  <div className=" order-2 sm:order-3 flex gap-4">
                    <button
                      className="button flex gap-2 items-center order-2 sm:order-3"
                      onClick={() => showModal("add")}
                    >
                      <BsDatabaseFillAdd />{" "}
                      <span className="hidden md:block">Tambah Barang</span>
                    </button>
                    <button
                      className="button flex gap-2 items-center order-2 sm:order-3"
                      onClick={() => showModal("take")}
                    >
                      <BsDatabaseFillAdd />{" "}
                      <span className="hidden md:block">Ambil Barang</span>
                    </button>
                  </div>
                </TableHeader>
                <TableBody>
                  {generateDynamicContent(
                    dataItems,
                    filteredData,
                    <TableItems
                      data={filteredData}
                      setId={setId}
                      setEditModal={() => showModal("edit")}
                      setDeleteModal={() => showModal("delete")}
                    />
                  )}
                </TableBody>
              </div>
            </section>
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddModalItem onClose={() => closeModal("add")} />
      </ShowModal>
      <ShowModal isVisible={modalState.take} onClose={() => closeModal("take")}>
        <FormTakeModalItem onClose={() => closeModal("take")} />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditModalItem onClose={() => closeModal("edit")} id={id} />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteModalItem onClose={() => closeModal("delete")} id={id} />
      </ShowModal>
    </>
  );
};

export default ItemsPage;
