import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalItem,
  FormDeleteModalItem,
  FormDeleteModalUser,
  FormEditModalItem,
  TableItems,
} from "../../components/molecules";
import { BsDatabaseFillAdd } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { TableBody, TableHeader, ShowModal } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById, fetchItems } from "../../Redux/Feature/ItemsSlice";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";

const ItemsPage = () => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.itemsSlice.data);
  const isLoading = useSelector((state) => state.itemsSlice.isLoading);
  const error = useSelector((state) => state.itemsSlice.error);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [id, dispatch]);
  // state modals in stock

  const { modalState, showModal, closeModal } = Modals();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(data, search);

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
                  <div className=" order-1">
                    <TitleTable>Data Barang</TitleTable>
                  </div>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
                  <button
                    className="button flex gap-2 items-center order-2 md:order-3"
                    onClick={() => showModal("add")}
                  >
                    <BsDatabaseFillAdd />{" "}
                    <span className="hidden md:block">Tambah Barang</span>
                  </button>
                </TableHeader>
                <TableBody>
                  {data.length === 0 ? (
                    <div className="min-h-[60vh] w-full flex justify-center items-center">
                      <div>Barang yang dicari tidak ditemukan</div>
                    </div>
                  ) : filteredData.length == 0 ? (
                    <div className="min-h-[60vh] flex w-full justify-center items-center">
                      <div>Barang yang dicari tidak ditemukan</div>
                    </div>
                  ) : (
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
