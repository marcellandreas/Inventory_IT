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
import Title from "../../components/atoms/Text/Title";
import { useNavigate } from "react-router-dom";

const GetUnusedItems = () => {
  const [toggleState, setToggleState] = useState(1);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/items/unused")
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading, data]);
  useEffect(() => {
    AxiosInstance.get("/pcline")
      .then((res) => {
        setData2(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading, data2]);
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
          {data2.length == 0 ? (
            "kosong"
          ) : isLoading ? (
            <p>Halaman Sedang Memuat Data</p>
          ) : (
            <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
              <section className="flex  gap-3">
                <button onClick={backToMenu} className="button">
                  Back
                </button>

                <button
                  onClick={() => {
                    setToggleState(1);
                  }}
                  className={`${
                    toggleState === 1
                      ? "bg-slate-500 hover:bg-slate-700"
                      : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
                  } rounded-md p-3 min-w-[100px]`}
                >
                  Terpakai
                </button>
                <button
                  onClick={() => {
                    setToggleState(2);
                  }}
                  className={`${
                    toggleState === 2
                      ? "bg-slate-500 hover:bg-slate-700"
                      : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
                  } rounded-md p-3 min-w-[100px]`}
                >
                  Tersedia
                </button>
              </section>
              {toggleState === 1 ? (
                <p>
                  <section className="w-[82vw] bg-slate-400 backdrop-blur-md">
                    <section className="table__header">
                      <Title>Tabel Komponen Terpakai</Title>
                      <div className="input-group">
                        <input
                          onChange={(e) => {
                            handleSearch(e);
                          }}
                          type="search"
                          placeholder="Search Data..."
                        />
                      </div>
                    </section>

                    <section className="table__body">
                      <TablePcLine
                        data={data2}
                        setId={setId}
                        setEditModalItem={setEditModal}
                        setDeleteModalItem={setDeleteModal}
                      />
                    </section>
                  </section>
                </p>
              ) : (
                <section className="w-[82vw] bg-slate-400 backdrop-blur-md">
                  <section className="table__header">
                    <Title>Tabel Komponen Tersedia</Title>
                    <div className="input-group">
                      <input
                        onChange={(e) => {
                          handleSearch(e);
                        }}
                        type="search"
                        placeholder="Search Data..."
                      />
                    </div>
                    {/* <button
                    className="button"
                    onClick={() => {
                      setAddModal(true);
                    }}
                  >
                    Add Item
                  </button> */}
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
          )}
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

export default GetUnusedItems;
