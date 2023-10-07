import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useEffect, useState } from "react";
import {
  FormAddModalItem,
  FormDeleteModalItem,
  FormEditModalItem,
  TablePcLine,
  TablePcMasters,
} from "../../components/molecules";
import Title from "../../components/atoms/Text/Title";
import { AxiosInstance } from "../../apis/api";
import { NavLink, useNavigate } from "react-router-dom";
import ShowModal from "../../components/organisms/ShowModal";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const GetAllPcMaster = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/pcmaster")
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

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };
  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
            {/* Header Kontent */}
            <section>
              <button onClick={backToMenu}>
                <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
              </button>
            </section>
            {isLoading ? (
              <p>Halaman Sedang Memuat Data</p>
            ) : (
              <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
                <section className="table__header">
                  <h1 className=" font-semibold text-md">Tabel Pc Master</h1>
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
                    Tambah PC Master
                  </button>
                </section>
                <section className="table__body">
                  <TablePcMasters
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

export default GetAllPcMaster;
