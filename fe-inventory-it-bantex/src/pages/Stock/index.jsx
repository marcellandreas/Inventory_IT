import { useEffect, useState } from "react";
import { SearchInput, TitleTable } from "../../components/atoms";
import {
  FormDeleteModalStock,
  TableStocks,
  Loading,
} from "../../components/molecules";
import { TableBody, TableHeader, ShowModal } from "../../components/organisms";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchStockNumbers,
  fetchStocks,
} from "../../Redux/Feature/StockSlice";
import { NavLink } from "react-router-dom";
import { filterDataBySearch } from "../../helpers/filters";
import { generateDynamicContent } from "../../components/templates/GenerateDynamicContent";
import Modals from "../../helpers/modals";

const StockPage = () => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const dataStock = useSelector((state) => state.stocks.data);
  const isLoading = useSelector((state) => state.stocks.isLoading);

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStockNumbers());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [deleteModalStock, setDeleteModalStock] = useState(false);

  // melakuan search
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataStock, search);
  const { modalState, showModal, closeModal } = Modals();

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          {isLoading ? (
            <Loading />
          ) : (
            <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
              <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
                <TableHeader>
                  <TitleTable>Data Stok</TitleTable>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
                  <NavLink
                    to={`buat`}
                    className="button flex gap-2 items-center order-2 sm:order-3"
                  >
                    <AiFillFileAdd />{" "}
                    <span className="hidden md:block">Tambah Stok</span>
                  </NavLink>
                </TableHeader>
                <TableBody>
                  {generateDynamicContent(
                    dataStock,
                    filteredData,
                    <TableStocks
                      data={filteredData}
                      setDeleteModal={() => showModal("delete")}
                      setId={setId}
                    />
                  )}
                </TableBody>
              </div>
            </section>
          )}
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      {/* <ShowModal
        isVisible={deleteModalStock}
        onClose={() => setDeleteModalStock(false)}
      >
        <FormDeleteModalStock
          isVisible={deleteModalStock}
          onClose={() => setDeleteModalStock(false)}
          id={id}
        />
      </ShowModal> */}
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteModalStock onClose={() => closeModal("delete")} id={id} />
      </ShowModal>
    </>
  );
};

export default StockPage;
