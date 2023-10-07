import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalStock,
  FormDeleteModalStock,
  FormEditModalStock,
  TableStocks,
} from "../../components/molecules";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";
import ShowModal from "../../components/organisms/ShowModal";

const StockPage = () => {
  const [dataStocks, setDataStocks] = useState([]);
  const [isIsLoading, setIsLoading] = useState(true);
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
  }, [isIsLoading]);
  // state modals in stock
  const [addModalStock, setAddModalStock] = useState(false);
  const [editModalStock, setEditModalStock] = useState(false);
  const [deleteModalStock, setDeleteModalStock] = useState(false);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <Title>Halaman Barang</Title>
          <section className="container mx-auto mt-5 flex flex-col gap-5">
            {isIsLoading ? (
              <p>Halaman Sedang Memuat Data</p>
            ) : (
              <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
                <section className="table__header">
                  <h1>Tabel Barang</h1>
                  <div className="input-group">
                    <input type="search" placeholder="Search Data..." />
                  </div>
                  <button
                    className="button"
                    onClick={() => {
                      setAddModalStock(true);
                    }}
                  >
                    Add Stock
                  </button>
                </section>
                <section className="table__body">
                  <TableStocks
                    data={dataStocks}
                    setId={setId}
                    setEditModalStock={setEditModalStock}
                    setDeleteModalStock={setDeleteModalStock}
                  />
                </section>
              </section>
            )}
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal
        isVisible={addModalStock}
        onClose={() => setAddModalStock(false)}
      >
        <FormAddModalStock
          onClose={() => setAddModalStock(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal
        isVisible={editModalStock}
        onClose={() => setEditModalStock(false)}
      >
        <FormEditModalStock
          isVisible={editModalStock}
          onClose={() => setEditModalStock(false)}
          id={id}
        />
      </ShowModal>
      <ShowModal
        isVisible={deleteModalStock}
        onClose={() => setDeleteModalStock(false)}
      >
        <FormDeleteModalStock
          isVisible={deleteModalStock}
          onClose={() => setDeleteModalStock(false)}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default StockPage;
