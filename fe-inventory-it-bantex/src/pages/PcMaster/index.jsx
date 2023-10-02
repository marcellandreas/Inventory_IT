import { useEffect, useState } from "react";
import {
  AddPcMaster,
  EditPcMaster,
  DeletePcMaster,
} from "../../components/organisms";
import { Sidebar } from "../../components/templates";
import { TablePcMasters } from "../../components/molecules";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";

const PcMaster = () => {
  const [dataStocks, setDataStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/pcmaster")
      .then((res) => {
        setDataStocks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading]);
  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <Sidebar>
        <Title>Halaman Mentoring PC</Title>
        <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
          {isLoading ? (
            <p>Halaman Sedang Memuat Data</p>
          ) : (
            <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
              <section className="table__header">
                <h1>Tabel pc:Master</h1>
                <div className="input-group">
                  <input type="search" placeholder="Search Data..." />
                </div>
                <button
                  onClick={() => {
                    setAddModal(true);
                  }}
                  className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700"
                >
                  Add PC
                </button>
              </section>
              <section className="table__body">
                <TablePcMasters
                  data={dataStocks}
                  setId={setId}
                  setEditModal={setEditModal}
                  setDeleteModal={setDeleteModal}
                />
              </section>
            </section>
          )}
        </section>
      </Sidebar>
      {/* Modals Popup */}
      <AddPcMaster
        isVisible={addModal}
        onClose={() => setAddModal(false)}
        setIsLoading={setIsLoading}
      />
      <EditPcMaster
        isVisible={editModal}
        onClose={() => setEditModal(false)}
        id={id}
      />
      <DeletePcMaster
        isVisible={deleteModal}
        onClose={() => setDeleteModal(false)}
        id={id}
      />
    </>
  );
};

export default PcMaster;
