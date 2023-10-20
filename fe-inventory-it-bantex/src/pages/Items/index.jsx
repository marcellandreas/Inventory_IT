import { useEffect, useState } from "react";
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
import { TitleTable } from "../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById, fetchItems } from "../../Redux/Feature/ItemsSlice";

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
  const [addModalItem, setAddModalItem] = useState(false);
  const [editModalItem, setEditModalItem] = useState(false);
  const [deleteModalItem, setDeleteModalItem] = useState(false);

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
            {isLoading ? (
              <p>Halaman Sedang Memuat Data</p>
            ) : (
              <section className="lg:w-[82vw] bg-slate-400 backdrop-blur-md">
                <TableHeader>
                  <TitleTable>Tabel Barang</TitleTable>
                  <div className="input-group">
                    <input
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      type="search"
                      placeholder="Search Data..."
                    />
                  </div>
                  <button
                    className="button flex gap-2 items-center"
                    onClick={() => {
                      setAddModalItem(true);
                    }}
                  >
                    <BsDatabaseFillAdd /> <span>Tambah Barang</span>
                  </button>
                </TableHeader>
                <TableBody>
                  <TableItems
                    data={data}
                    setId={setId}
                    setEditModalItem={setEditModalItem}
                    setDeleteModalItem={setDeleteModalItem}
                  />
                </TableBody>
              </section>
            )}
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal
        isVisible={addModalItem}
        onClose={() => setAddModalItem(false)}
      >
        <FormAddModalItem
          onClose={() => setAddModalItem(false)}
          // setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal
        isVisible={editModalItem}
        onClose={() => setEditModalItem(false)}
      >
        <FormEditModalItem
          // isVisible={editModalItem}
          onClose={() => setEditModalItem(false)}
          // setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal
        isVisible={deleteModalItem}
        onClose={() => deleteModalItem(false)}
      >
        <FormDeleteModalItem
          // isVisible={deleteModalItem}
          onClose={() => setDeleteModalItem(false)}
          // setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default ItemsPage;
