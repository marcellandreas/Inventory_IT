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
import { TitleTable } from "../../components/atoms";
import { TableBody, TableHeader } from "../../components/organisms";
import Loading from "../../components/molecules/Loading";

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
          <section className="container  mx-auto mt-5 flex flex-col gap-5 items-center">
            {isIsLoading ? (
              <Loading />
            ) : (
              <section className="w-[82vw] bg-slate-400 backdrop-blur-md">
                <TableHeader>
                  <TitleTable>Data Tabel Barang</TitleTable>
                  <div className="input-group">
                    <input type="search" placeholder="Search Data..." />
                  </div>
                  <button
                    className="button"
                    onClick={() => {
                      setAddModalStock(true);
                    }}
                  >
                    Tambah Stock
                  </button>
                </TableHeader>
                <TableBody>
                  <TableStocks
                    data={dataStocks}
                    setId={setId}
                    setEditModalStock={setEditModalStock}
                    setDeleteModalStock={setDeleteModalStock}
                  />
                </TableBody>
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
