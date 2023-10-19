import { useEffect, useState } from "react";

import {
  TableDataUsers,
  TableDataAdmins,
  Sidebar,
  LayoutContentDashboard,
} from "../../components/templates";
import { AxiosInstance } from "../../apis/api";
import Title from "../../components/atoms/Text/Title";
import { useSelector } from "react-redux";
import {
  setDataItemsReq,
  setLoadingPengajuan,
} from "../../Redux/Feature/DataPengajuanBarang";
import {
  setDataPt,
  setLoadingDivPt,
} from "../../Redux/Feature/DataDivisionAndPT";
import {
  FormAddModalUser,
  FormDeleteModalUser,
  FormEditModalUser,
  TableItems,
  TableUsers,
} from "../../components/molecules";
import { ShowModal, TableBody, TableHeader } from "../../components/organisms";
import { TitleTable } from "../../components/atoms";
import { BsDatabaseFillAdd } from "react-icons/bs";

const AccesPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const [users, setUsers] = useState([]);
  const [admin, setAdmins] = useState([]);
  const [manager, setManager] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  const userData = useSelector((state) => state.user);
  const username = userData.username;
  const role = userData.role;
  const id_user = userData.id_user;

  // Show Modal useState
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    AxiosInstance.get("/users")
      .then((res) => {
        setIsLoading(false);
        const data = res.data.data;

        const admins = data.filter((user) => user.role === "1");
        const users = data.filter((user) => user.role === "2");
        const managers = data.filter((user) => user.role === "3");
        setAdmins(admins);
        setUsers(users);
        setManager(managers);
        setAllData(data);
      })
      .catch(handleFetchError);
  }, [isLoading]);

  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="flex gap-2 p-2 max-w-[440px] bg-slate-200 h-12  mb-5 rounded-lg">
            <button
              onClick={() => {
                setToggleState(1);
              }}
              className={`${
                toggleState === 1
                  ? "bg-slate-500 hover:bg-slate-700"
                  : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
              } rounded-md p-1 min-w-[100px]`}
            >
              All
            </button>
            <button
              onClick={() => {
                setToggleState(2);
              }}
              className={`${
                toggleState === 2
                  ? "bg-slate-500 hover:bg-slate-700"
                  : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
              } rounded-md p-1 min-w-[100px]`}
            >
              Users
            </button>
            <button
              onClick={() => {
                setToggleState(3);
              }}
              className={`${
                toggleState === 3
                  ? "bg-slate-500 hover:bg-slate-700"
                  : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
              } rounded-md p-1 min-w-[100px]`}
            >
              Admins
            </button>
            <button
              onClick={() => {
                setToggleState(4);
              }}
              className={`${
                toggleState === 4
                  ? "bg-slate-500 hover:bg-slate-700"
                  : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
              } rounded-md p-1 min-w-[100px]`}
            >
              Manager
            </button>
          </section>
          <TableHeader>
            <TitleTable>Tabel Barang</TitleTable>
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
                setAddModal(true);
              }}
            >
              <BsDatabaseFillAdd /> <span>Tambah User</span>
            </button>
          </TableHeader>
          <TableBody>
            {toggleState === 1 ? (
              <TableUsers
                data={allData}
                setIsLoading={setIsLoading}
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
                setId={setId}
              />
            ) : toggleState === 2 ? (
              <TableUsers
                data={users}
                setIsLoading={setIsLoading}
                setId={setId}
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
              />
            ) : toggleState === 3 ? (
              <TableUsers
                data={admin}
                setIsLoading={setIsLoading}
                setId={setId}
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
              />
            ) : toggleState === 4 ? (
              <TableUsers
                data={manager}
                setIsLoading={setIsLoading}
                setId={setId}
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
              />
            ) : null}
          </TableBody>
        </LayoutContentDashboard>
      </Sidebar>
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalUser
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={editModal} onClose={() => setEditModal(false)}>
        <FormEditModalUser
          onClose={() => setEditModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormDeleteModalUser
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default AccesPage;
