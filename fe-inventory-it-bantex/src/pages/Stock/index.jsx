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

const StockList = ({ data, setDeleteModalStock, setId }) => {
  if (data.length === 0) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div>Tidak ada stock yang dicari</div>
      </div>
    );
  } else {
    return (
      <TableStocks
        data={data}
        setDeleteModalStock={setDeleteModalStock}
        setId={setId}
      />
    );
  }
};

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
                  <div className="order-1 ">
                    <TitleTable>Data Stok</TitleTable>
                  </div>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
                  <NavLink
                    to={`buat`}
                    className="button flex gap-2 items-center order-2 md:order-3"
                  >
                    <AiFillFileAdd />{" "}
                    <span className="hidden md:block">Tambah Stok</span>
                  </NavLink>
                </TableHeader>
                <TableBody>
                  {dataStock.length === 0 ? (
                    <div className="min-h-[60vh] flex justify-center items-center">
                      <div>Stock Tidak Tersedia</div>
                    </div>
                  ) : (
                    <StockList
                      data={filteredData}
                      setDeleteModalStock={setDeleteModalStock}
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
