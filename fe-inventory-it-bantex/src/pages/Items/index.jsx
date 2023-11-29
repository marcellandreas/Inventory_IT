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
import { SearchInput, TitleTable, CustomButton } from "../../components/atoms";
import { filterDataBySearch, Modals } from "../../helpers";
import { useFetchItems } from "../../config/GetData";
import { MdLocalPrintshop } from "react-icons/md";

const ItemsPage = () => {
  const [id, setId] = useState("");
  const dataItems = useFetchItems();
  const { modalState, showModal, closeModal } = Modals();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataItems, search);
  const stylePrint =
    "bg-slate-800 p-2 rounded-lg flex items-center gap-1 text-white hover:bg-slate-700";
  return (
    <>
      <MainLayout>
        <ContentLayout>
          <section className="flex col-span-6 sm:col-span-6 items-center  cards gap-2 p-1 place-self-end">
            <NavLink to={`/barcode`} className={stylePrint}>
              <MdLocalPrintshop /> <span>Barcode</span>
            </NavLink>
            <NavLink to={`/qrcode`} className={stylePrint}>
              <MdLocalPrintshop /> <span>Qrcode</span>
            </NavLink>
            <Print
              titleDocument="Items"
              PrintPDF={<TableItems data={dataItems} />}
              PrintCSV={dataItems}
            />
          </section>
          <ShowTable gap={6}>
            <TableHeader>
              <TitleTable count={dataItems.length}>Data Items</TitleTable>
              <div className=" order-2 sm:order-3 flex gap-4">
                <CustomButton style={1} onClick={() => showModal("add")}>
                  <BsDatabaseFillAdd />
                  <p className="flex">
                    Tambah <span className="hidden sm:block">Barang</span>
                  </p>
                </CustomButton>
                <CustomButton style={1} onClick={() => showModal("take")}>
                  <BsDatabaseFillAdd />
                  <p className="flex">
                    Ambil <span className="hidden sm:block">Barang</span>
                  </p>
                </CustomButton>
              </div>
              <SearchInput search={search} onChange={handleSearchChange} />
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
