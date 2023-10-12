import { useEffect, useState } from "react";
import LayoutContentDashboard from "../../components/templates/LayoutContentDashboard";
import Sidebar from "../../components/templates/Sidebar";
import { Title } from "../../components/atoms";
import { AiFillFileAdd } from "react-icons/ai";
import TableApplicationsForm from "../../components/molecules/Table/TableApplicationsForm";
import { AxiosInstance } from "../../apis/api";
import { NavLink } from "react-router-dom";

const Applications = () => {
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
    <Sidebar>
      <LayoutContentDashboard>
        {/* <section className="container mx-auto mt-5 flex flex-col gap-5  w-full"> */}
        {/* <div className="flex gap-2">
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
            </div> */}

        <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
          <section className="table__header">
            <Title>Tabel `Form Pengajuan Barang`</Title>
            <div className="input-group">
              <input type="search" placeholder="Search Data..." />
            </div>
            <NavLink to={`buat`} className="button flex gap-2 items-center">
              <AiFillFileAdd /> <span>Buat Pengajuan</span>
            </NavLink>
          </section>
          <section className="table__body">
            <TableApplicationsForm
              data={data}
              setId={setId}
              setEditModalItem={setEditModalItem}
              setDeleteModalItem={setDeleteModalItem}
            />
          </section>
        </section>
        {/* </section> */}
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Applications;
