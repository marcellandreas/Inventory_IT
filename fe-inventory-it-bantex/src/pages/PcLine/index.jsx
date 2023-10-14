import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalItem,
  FormDeleteModalItem,
  FormEditModalItem,
  TablePcLine,
} from "../../components/molecules";
import { AxiosInstance } from "../../apis/api";
import ShowModal from "../../components/organisms/ShowModal";
import { TitleTable } from "../../components/atoms";

const PcLine = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/pcline")
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading, data]);
  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
            {isLoading ? (
              <p>Halaman Sedang Memuat Data</p>
            ) : (
              <section className="w-[82vw] bg-slate-400 backdrop-blur-md">
                <section className="table__header">
                  <TitleTable>Data Tabel Komponen</TitleTable>
                  <p>Kode saat ini: </p>
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
                    className="button"
                    onClick={() => {
                      setAddModal(true);
                    }}
                  >
                    Add Item
                  </button>
                </section>

                <section className="table__body">
                  <TablePcLine
                    data={data}
                    setId={setId}
                    setEditModalItem={setEditModal}
                    setDeleteModalItem={setDeleteModal}
                  />
                </section>
              </section>
            )}
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalItem
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={editModal} onClose={() => setEditModal(false)}>
        <FormEditModalItem
          // isVisible={editModalItem}
          onClose={() => setEditModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => deleteModal(false)}>
        <FormDeleteModalItem
          // isVisible={deleteModalItem}
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default PcLine;
