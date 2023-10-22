import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalStock,
  FormDeleteModalStock,
  FormEditModalStock,
  TableStocks,
} from "../../components/molecules";
import { AxiosInstance } from "../../apis/api";
import ShowModal from "../../components/organisms/ShowModal";
import { TitleTable } from "../../components/atoms";
import { TableBody, TableHeader } from "../../components/organisms";
import Loading from "../../components/molecules/Loading";
import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchStockById,
  fetchStockByNo,
  fetchStockNumbers,
  fetchStocks,
} from "../../Redux/Feature/StockSlice";
import { NavLink } from "react-router-dom";

const StockPage = () => {
  const [id, setId] = useState("");
  const [formValues, setFormValues] = useState({
    stock_no: "",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.stocks.data);
  const dataGetStockNo = useSelector((state) => state.stocks.dataGetStockNo);
  const categories = useSelector((state) => state.stocks.categories);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStockNumbers());
  }, []);
  useEffect(() => {
    // Dispatch fetchCategories thunk untuk mengambil kategori
    dispatch(fetchCategories());
  }, [dispatch]);

  const fetchDataStockByNo = (stockNo) => {
    dispatch(fetchStockByNo(stockNo));
  };

  useEffect(() => {
    if (formValues.stock_no) {
      fetchDataStockByNo(formValues.stock_no);
    }
  }, [formValues.stock_no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const options = [
  //   <option value={formValues.stock_no || null}>
  //     {formValues.stock_no || null}
  //   </option>,
  //   ...(dataStockNo
  //     ? dataStockNo.map((stock, i) => (
  //         <option key={i} value={stock}>
  //           {stock}
  //         </option>
  //       ))
  //     : []),
  // ];
  // state modals in stock
  const [addModalStock, setAddModalStock] = useState(false);
  const [editModalStock, setEditModalStock] = useState(false);
  const [deleteModalStock, setDeleteModalStock] = useState(false);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) => {
    // Gabungkan nilai dari semua properti menjadi satu string
    const searchableFields = Object.values(item).join(" ").toLowerCase();
    return searchableFields.includes(search.toLowerCase());
  });

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="grid grid-cols-6 h-[74vh]  gap-4 grid-flow-dense ">
            <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
              <TableHeader>
                <TitleTable>Tabel Stok</TitleTable>
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Search Data..."
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <NavLink to={`buat`} className="button flex gap-2 items-center">
                  <AiFillFileAdd /> <span>Tambah Stok</span>
                </NavLink>
              </TableHeader>
              <TableBody>
                <TableStocks
                  data={filteredData}
                  setEditModalStock={setEditModalStock}
                  setDeleteModalStock={setDeleteModalStock}
                  setId={setId}
                />
              </TableBody>
            </div>
          </section>
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal
        isVisible={addModalStock}
        onClose={() => setAddModalStock(false)}
      >
        <FormAddModalStock
          onClose={() => setAddModalStock(false)}
          // setIsLoading={setIsLoading}
          category={categories}
        />
      </ShowModal>
      <ShowModal
        isVisible={editModalStock}
        onClose={() => setEditModalStock(false)}
      >
        <FormEditModalStock
          isVisible={editModalStock}
          onClose={() => setEditModalStock(false)}
          id={id}
          category={categories}
        />
      </ShowModal>
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
