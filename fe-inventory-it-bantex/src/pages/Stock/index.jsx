import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { FormDeleteModalStock, TableStocks } from "../../components/molecules";
import ShowModal from "../../components/organisms/ShowModal";
import { TitleTable } from "../../components/atoms";
import { TableBody, TableHeader } from "../../components/organisms";
import Loading from "../../components/molecules/Loading";
import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchStockNumbers,
  fetchStocks,
} from "../../Redux/Feature/StockSlice";
import { NavLink } from "react-router-dom";

const StockPage = () => {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.stocks.data);
  const isLoading = useSelector((state) => state.stocks.isLoading);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStockNumbers());
  }, []);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [deleteModalStock, setDeleteModalStock] = useState(false);

  // melakuan search
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchableFields = Object.values(item).join(" ").toLowerCase();
    return searchableFields.includes(search.toLowerCase());
  });

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
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search Data..."
                      value={search}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <NavLink
                    to={`buat`}
                    className="button flex gap-2 items-center"
                  >
                    <AiFillFileAdd /> <span>Tambah Stok</span>
                  </NavLink>
                </TableHeader>
                <TableBody>
                  <TableStocks
                    data={filteredData}
                    setDeleteModalStock={setDeleteModalStock}
                    setId={setId}
                  />
                </TableBody>
              </div>
            </section>
          )}
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal
        isVisible={deleteModalStock}
        onClose={() => setDeleteModalStock(false)}
      >
        <FormDeleteModalStock
          isVisible={deleteModalStock}
          onClose={() => setDeleteModalStock(false)}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default StockPage;
