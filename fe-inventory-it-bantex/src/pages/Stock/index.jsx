import { useEffect, useState } from "react";
import { AddStock, EditStock, DeleteStock } from "../../components/organisms";
import { Sidebar } from "../../components/templates";
import { TableStocks } from "../../components/molecules";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";

const StockPage = () => {
  const [dataStocks, setDataStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/stocks")
      .then((res) => {
        setDataStocks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading]);
  // state modals in stock
  const [addModalStock, setAddModalStock] = useState(false);
  const [editModalStock, setEditModalStock] = useState(false);
  const [deleteModalStock, setDeleteModalStock] = useState(false);

  return (
    <>
      <Sidebar>
        <Title>Halaman Barang</Title>
        <section className="container mx-auto mt-5 flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold mb-4">Table Stock</h1>
            <button
              onClick={() => {
                setAddModalStock(true);
              }}
              className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
            >
              Add Stock
            </button>
          </div>
          <hr />
          {isLoading ? (
            <p>Halaman Sedang Memuat Data</p>
          ) : (
            <TableStocks
              data={dataStocks}
              setId={setId}
              setEditModalStock={setEditModalStock}
              setDeleteModalStock={setDeleteModalStock}
            />
          )}
        </section>
      </Sidebar>
      {/* Modals Popup */}
      <AddStock
        isVisible={addModalStock}
        onClose={() => setAddModalStock(false)}
        setIsLoading={setIsLoading}
      />
      <EditStock
        isVisible={editModalStock}
        onClose={() => setEditModalStock(false)}
        id={id}
      />
      <DeleteStock
        isVisible={deleteModalStock}
        onClose={() => setDeleteModalStock(false)}
        id={id}
      />
    </>
  );
};

export default StockPage;
