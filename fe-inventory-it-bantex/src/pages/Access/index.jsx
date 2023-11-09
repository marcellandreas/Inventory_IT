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
import { BsDatabaseFillAdd } from "react-icons/bs";
import { filterDataBySearch } from "../../helpers/filters";
import Modals from "../../helpers/modals";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Feature/UserSlice";
import { generateDynamicContent } from "../../components/templates/GenerateDynamicContent";
import TabBar from "@TabBar";

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
  const { admins, users, managers, allData, isLoading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const filteredData = filterDataBySearch(allData, search);
  const filteredDataAdmin = filterDataBySearch(admins, search);
  const filteredDataUser = filterDataBySearch(users, search);
  const filteredDataManager = filterDataBySearch(managers, search);
  const tabs = ["Semua", "Pengguna", "Admin", "Manajer", "Login History"];
  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="grid grid-cols-6 gap-4 grid-flow-dense w-full  ">
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
                    <button
                      className="button flex gap-2 items-center order-2 sm:order-3"
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
          // setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditModalUser
          onClose={() => closeModal("edit")}
          // setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteModalUser
          onClose={() => closeModal("delete")}
          // setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default AccesPage;
