import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalItem,
  FormDeleteModalItem,
  FormEditModalItem,
  TableItems,
} from "../../components/molecules";
import { BsDatabaseFillAdd } from "../../assets/icons/icons";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";
import { NavLink } from "react-router-dom";
import ShowModal from "../../components/organisms/ShowModal";

const ItemsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/items")
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading, data]);
  // state modals in stock
  const [addModalItem, setAddModalItem] = useState(false);
  const [editModalItem, setEditModalItem] = useState(false);
  const [deleteModalItem, setDeleteModalItem] = useState(false);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
            <div className="flex gap-2">
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
              <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
                <section className="table__header">
                  <Title>Tabel Barang</Title>
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
                </section>
                <section className="table__body">
                  <TableItems
                    data={data}
                    setId={setId}
                    setEditModalItem={setEditModalItem}
                    setDeleteModalItem={setDeleteModalItem}
                  />
                </section>
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
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal
        isVisible={editModalItem}
        onClose={() => setEditModalItem(false)}
      >
        <FormEditModalItem
          // isVisible={editModalItem}
          onClose={() => setEditModalItem(false)}
          setIsLoading={setIsLoading}
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
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default ItemsPage;