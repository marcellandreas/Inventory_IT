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
  TableItems,
} from "../../components/molecules";
import { BsDatabaseFillAdd } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { TableBody, TableHeader, ShowModal } from "../../components/organisms";
import { SearchInput } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";
import { useFetchItems } from "../../config/GetData";
import { MdLocalPrintshop } from "react-icons/md";
import DropdownPrintItems from "../../components/molecules/Dropdown/DropdownPrintItems";

const ItemsPage = () => {
  const [id, setId] = useState("");
  const dataItems = useFetchItems();
  const { modalState, showModal, closeModal } = Modals();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataItems, search);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <MainLayout>
        <ContentLayout>
          <section className="col-span-6 w-full mx-auto flex gap-5 items-center  justify-between">
            <div className=" flex gap-2">
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
            <div className="flex z-50 ">
              {showDropdown && (
                <DropdownPrintItems dataCsv={dataItems} dataPdf={dataItems} />
              )}
              <button
                className="button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MdLocalPrintshop />
                Print
              </button>
            </div>
          </section>
          <section className=" col-span-6 h-[75vh] w-full  gap-4 bg-slate-200 rounded-xl min-h-[50px]  ">
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
                  <BsDatabaseFillAdd /> <span>Tambah Barang</span>
                </button>
                <button
                  className="button flex gap-2 items-center order-2 sm:order-3"
                  onClick={() => showModal("take")}
                >
                  <BsDatabaseFillAdd /> <span>Ambil Barang</span>
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
          </section>
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
