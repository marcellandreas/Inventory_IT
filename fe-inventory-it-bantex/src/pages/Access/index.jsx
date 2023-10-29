import { useEffect, useState } from "react";
import { SearchInput, TitleTable } from "../../components/atoms";
import {
  FormAddModalUser,
  FormDeleteModalUser,
  FormEditModalUser,
  TableUsers,
} from "../../components/molecules";
import { ShowModal, TableBody, TableHeader } from "../../components/organisms";
import { Sidebar, LayoutContentDashboard } from "../../components/templates";
import { AxiosInstance } from "../../apis/api";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";

const AccesPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const [users, setUsers] = useState([]);
  const [admin, setAdmins] = useState([]);
  const [manager, setManager] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const { modalState, showModal, closeModal } = Modals();

  // melakuan search
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/users");
        const data = response.data.data;

        const admins = data.filter((user) => user.role === "1");
        const users = data.filter((user) => user.role === "2");
        const managers = data.filter((user) => user.role === "3");

        setAdmins(admins);
        setUsers(users);
        setManager(managers);
        setAllData(data);

        setIsLoading(false);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchData();
  }, [isLoading]);

  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };

  const filteredData = filterDataBySearch(allData, search);
  const filteredDataAdmin = filterDataBySearch(admin, search);
  const filteredDataUser = filterDataBySearch(users, search);
  const filteredDataManager = filterDataBySearch(manager, search);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="grid grid-cols-6 gap-4 grid-flow-dense w-full  ">
            <div className="self-start flex-wrap flex justify-between w-full col-span-6 row-span-2 ">
              <section className="flex flex-wrap  w-full gap-2 p-2 bg-slate-200 mb-5 rounded-lg order-1 ">
                {["Semua", "Pengguna", "Admin", "Manajer", "Login History"].map(
                  (label, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setToggleState(index + 1), setSearch("");
                      }}
                      className={`${
                        toggleState === index + 1
                          ? "bg-slate-500 hover:bg-slate-700"
                          : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
                      } rounded-md p-1 min-w-[100px]`}
                    >
                      {label}
                    </button>
                  )
                )}
              </section>
            </div>
            <div className="col-span-6">
              <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
                <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
                  <TableHeader>
                    <div className="order-1">
                      <TitleTable>Data Users</TitleTable>
                    </div>
                    <SearchInput
                      search={search}
                      handleSearchChange={handleSearchChange}
                    />
                    <button
                      className="button flex gap-2 items-center order-2 md:order-3"
                      onClick={() => showModal("add")}
                    >
                      <BsDatabaseFillAdd />
                      <span className="hidden md:block">Tambah User</span>
                    </button>
                  </TableHeader>
                  <TableBody>
                    {toggleState === 1 ? (
                      <>
                        {filteredData.length == 0 ? (
                          <div className="min-h-[60vh] flex justify-center items-center">
                            <div>Users yang dicari tidak ditemukan</div>
                          </div>
                        ) : (
                          <TableUsers
                            data={filteredData}
                            setIsLoading={setIsLoading}
                            setEditModal={() => showModal("edit")}
                            setDeleteModal={() => showModal("delete")}
                            setId={setId}
                          />
                        )}
                      </>
                    ) : toggleState === 2 ? (
                      <>
                        {filteredDataUser.length == 0 ? (
                          <div className="min-h-[60vh] flex justify-center items-center">
                            <div>Users yang dicari tidak ditemukan</div>
                          </div>
                        ) : (
                          <TableUsers
                            data={filteredDataUser}
                            setIsLoading={setIsLoading}
                            setId={setId}
                            setEditModal={() => showModal("edit")}
                            setDeleteModal={() => showModal("delete")}
                          />
                        )}
                      </>
                    ) : toggleState === 3 ? (
                      <>
                        {filteredDataAdmin.length == 0 ? (
                          <div className="min-h-[60vh] flex justify-center items-center">
                            <div>Users yang dicari tidak ditemukan</div>
                          </div>
                        ) : (
                          <TableUsers
                            data={filteredDataAdmin}
                            setIsLoading={setIsLoading}
                            setId={setId}
                            setEditModal={() => showModal("edit")}
                            setDeleteModal={() => showModal("delete")}
                          />
                        )}
                      </>
                    ) : toggleState === 4 ? (
                      <>
                        {filteredDataAdmin.length == 0 ? (
                          <div className="min-h-[60vh] flex justify-center items-center">
                            <div>Users yang dicari tidak ditemukan</div>
                          </div>
                        ) : (
                          <TableUsers
                            data={filteredDataManager}
                            setIsLoading={setIsLoading}
                            setId={setId}
                            setEditModal={() => showModal("edit")}
                            setDeleteModal={() => showModal("delete")}
                          />
                        )}
                      </>
                    ) : null}
                  </TableBody>
                </div>
              </section>
            </div>
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddModalUser
          onClose={() => closeModal("add")}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditModalUser
          onClose={() => closeModal("edit")}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteModalUser
          onClose={() => closeModal("delete")}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default AccesPage;
