import { useState } from "react";
import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import {
  FormAddItem,
  FormDeleteItem,
  FormEditItem,
  FormTakeItem,
  Print,
  TableItems,
} from "../../components/molecules";
import { BsDatabaseFillAdd } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import {
  TableBody,
  TableHeader,
  ShowModal,
  ShowTable,
} from "../../components/organisms";
import { SearchInput } from "../../components/atoms";
import { filterDataBySearch, Modals } from "../../helpers";
import { useFetchItems } from "../../config/GetData";

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
      <MainLayout>
        <ContentLayout>
          <section className="col-span-4 cards p-2  flex gap-2 place-self-start ">
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
          </section>
          <section className="flex col-span-2 cards gap-2 p-2 place-self-end">
            <Print
              titleDocument="Items"
              PrintPDF={<TableItems data={dataItems} />}
              PrintCSV={dataItems}
            />
          </section>
          <ShowTable gap={6}>
            <TableHeader>
              <SearchInput
                search={search}
                handleSearchChange={handleSearchChange}
              />
              <div className=" order-2 sm:order-3 flex gap-4">
                <button
                  className="button flex gap-2 items-center order-2 sm:order-3"
                  onClick={() => showModal("add")}
                >
                  <BsDatabaseFillAdd />
                  <p className="flex p-0">
                    Tambah <span className="hidden md:block">Barang</span>
                  </p>
                </button>
                <button
                  className="button flex gap-2 items-center order-2 sm:order-3"
                  onClick={() => showModal("take")}
                >
                  <BsDatabaseFillAdd />{" "}
                  <p className="flex p-0">
                    Ambil <span className="hidden  md:block">Barang</span>
                  </p>
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
          </ShowTable>
        </ContentLayout>
      </MainLayout>
      {/* Modals Popup */}
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddItem onClose={() => closeModal("add")} />
      </ShowModal>
      <ShowModal isVisible={modalState.take} onClose={() => closeModal("take")}>
        <FormTakeItem onClose={() => closeModal("take")} />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditItem onClose={() => closeModal("edit")} id={id} />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteItem onClose={() => closeModal("delete")} id={id} />
      </ShowModal>
    </>
  );
};

export default ItemsPage;
