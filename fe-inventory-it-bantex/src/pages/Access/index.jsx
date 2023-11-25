import { useEffect, useState } from "react";
import { SearchInput, TitleTable } from "../../components/atoms";
import {
  FormAddUser,
  FormDeleteUser,
  FormEditUser,
  Print,
  TableLoginHistory,
  TableUsers,
} from "../../components/molecules";
import {
  ShowContent,
  ShowModal,
  ShowTable,
  TableBody,
  TableHeader,
} from "../../components/organisms";
import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { filterDataBySearch, Modals } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginHistory,
  fetchUserData,
} from "../../Redux/Feature/UserSlice";
import TabBar from "@TabBar";
import { MdAddCircleOutline } from "react-icons/md";
import "./style.css";

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
  const { admins, users, managers, allData, isLoading, dataLoginHistory } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchLoginHistory());
  }, [dispatch]);

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
          <ShowContent col={4}>
            <TabBar
              tabs={tabs}
              setSearch={setSearch}
              setToggleState={setToggleState}
              toggleState={toggleState}
            />
          </ShowContent>
          <ShowContent col={2} placeSelf="end">
            <Print
              titleDocument="Items"
              PrintPDF={<TableUsers data={allData} />}
              PrintCSV={allData}
            />
          </ShowContent>
          <ShowTable gap={6}>
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
              ) : null}
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
          </ShowTable>
        </ContentLayout>
      </MainLayout>
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddUser onClose={() => closeModal("add")} isLoading={isLoading} />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditUser
          onClose={() => closeModal("edit")}
          id={id}
          isLoading={isLoading}
        />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteUser
          onClose={() => closeModal("delete")}
          id={id}
          isLoading={isLoading}
        />
      </ShowModal>
    </>
  );
};

export default AccesPage;
