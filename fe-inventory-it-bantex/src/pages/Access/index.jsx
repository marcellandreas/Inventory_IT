import { useEffect, useState } from "react";
import { SearchInput, TitleTable } from "../../components/atoms";
import {
  FormAddUser,
  FormDeleteUser,
  FormEditUser,
  TableLoginHistory,
  TableUsers,
} from "../../components/molecules";
import { ShowModal, TableBody, TableHeader } from "../../components/organisms";
import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginHistory,
  fetchUserData,
} from "../../Redux/Feature/UserSlice";
import TabBar from "@TabBar";
import { MdAddCircleOutline } from "react-icons/md";

const AccesPage = () => {
  const [toggleState, setToggleState] = useState(1);

  const [id, setId] = useState("");
  const { modalState, showModal, closeModal } = Modals();

  // melakuan search
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const dispatch = useDispatch();
  const {
    admins,
    users,
    managers,
    allData,
    isLoading,
    error,
    dataLoginHistory,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchLoginHistory());
  }, [dispatch]);

  console.log(dataLoginHistory);
  const filteredData = filterDataBySearch(allData, search);
  const filteredDataAdmin = filterDataBySearch(admins, search);
  const filteredDataUser = filterDataBySearch(users, search);
  const filteredDataManager = filterDataBySearch(managers, search);
  const filteredDataLoginHistory = filterDataBySearch(dataLoginHistory, search);
  const tabs = ["Semua", "Pengguna", "Admin", "Manajer", "Login History"];
  return (
    <>
      <MainLayout>
        <ContentLayout>
          <div className="self-start flex-wrap flex justify-between w-full col-span-6 row-span-2 ">
            <TabBar
              tabs={tabs}
              setSearch={setSearch}
              setToggleState={setToggleState}
              toggleState={toggleState}
            />
          </div>
          <div className="col-span-6">
            <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
              <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
                <TableHeader>
                  <div className="order-1">
                    <TitleTable>Data Pengguna</TitleTable>
                  </div>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />

                  {tabs[4] === "Login History" ? (
                    <button
                      className="button flex gap-2 items-center order-2 sm:order-3"
                      onClick={() => showModal("add")}
                    >
                      <MdAddCircleOutline />
                      <span className="hidden md:block">Tambah User</span>
                    </button>
                  ) : (
                    <p>a</p>
                  )}
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
                          // setIsLoading={setIsLoading}
                          setEditModal={() => showModal("edit")}
                          setDeleteModal={() => showModal("delete")}
                          setId={setId}
                        />
                      )}
                    </>
                  ) : toggleState === 2 ? (
                    <>
                      {generateDynamicContent(
                        users,
                        filteredDataUser,
                        <TableUsers
                          data={filteredDataUser}
                          // setIsLoading={setIsLoading}
                          setId={setId}
                          setEditModal={() => showModal("edit")}
                          setDeleteModal={() => showModal("delete")}
                        />
                      )}
                    </>
                  ) : toggleState === 3 ? (
                    <>
                      {generateDynamicContent(
                        admins,
                        filteredDataAdmin,
                        <TableUsers
                          data={filteredDataAdmin}
                          // setIsLoading={setIsLoading}
                          setId={setId}
                          setEditModal={() => showModal("edit")}
                          setDeleteModal={() => showModal("delete")}
                        />
                      )}
                    </>
                  ) : toggleState === 4 ? (
                    <>
                      {generateDynamicContent(
                        managers,
                        filteredDataManager,
                        <TableUsers
                          data={filteredDataManager}
                          // setIsLoading={setIsLoading}
                          setId={setId}
                          setEditModal={() => showModal("edit")}
                          setDeleteModal={() => showModal("delete")}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {generateDynamicContent(
                        dataLoginHistory,
                        filteredDataLoginHistory,
                        <TableLoginHistory
                          data={filteredDataLoginHistory}
                          setId={setId}
                          setEditModal={() => showModal("edit")}
                          setDeleteModal={() => showModal("delete")}
                        />
                      )}
                    </>
                  )}
                </TableBody>
              </div>
            </section>
          </div>
        </ContentLayout>
      </MainLayout>
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddUser onClose={() => closeModal("add")} />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditUser onClose={() => closeModal("edit")} id={id} />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteUser onClose={() => closeModal("delete")} id={id} />
      </ShowModal>
    </>
  );
};

export default AccesPage;
