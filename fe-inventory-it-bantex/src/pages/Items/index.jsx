import { useEffect, useState } from "react";
import { AddItem, EditItem, DeleteItem } from "../../components/organisms";
import { Sidebar } from "../../components/templates";
import { TableItems } from "../../components/molecules";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";

const ItemsPage = () => {
  const [dataStocks, setDataStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/items")
      .then((res) => {
        setDataStocks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading]);
  // state modals in stock
  const [addModalItem, setAddModalItem] = useState(false);
  const [editModalItem, setEditModalItem] = useState(false);
  const [deleteModalItem, setDeleteModalItem] = useState(false);

  return (
    <>
      <Sidebar>
        <Title>Halaman Barang</Title>
        <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
          {isLoading ? (
            <p>Halaman Sedang Memuat Data</p>
          ) : (
            <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
              <section className="table__header">
                <h1>Tabel Barang</h1>
                <div className="input-group">
                  <input type="search" placeholder="Search Data..." />
                </div>
                <button
                  onClick={() => {
                    setAddModalItem(true);
                  }}
                  className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
                >
                  Add Item
                </button>
              </section>
              <section className="table__body">
                <TableItems
                  data={dataStocks}
                  setId={setId}
                  setEditModalItem={setEditModalItem}
                  setDeleteModalItem={setDeleteModalItem}
                />
              </section>
            </section>
          )}
        </section>
      </Sidebar>
      {/* Modals Popup */}
      <AddItem
        isVisible={addModalItem}
        onClose={() => setAddModalItem(false)}
        setIsLoading={setIsLoading}
      />
      <EditItem
        isVisible={editModalItem}
        onClose={() => setEditModalItem(false)}
        id={id}
      />
      <DeleteItem
        isVisible={deleteModalItem}
        onClose={() => setDeleteModalItem(false)}
        id={id}
      />
    </>
  );
};

export default ItemsPage;
