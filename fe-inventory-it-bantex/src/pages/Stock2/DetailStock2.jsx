import { useNavigate, useParams } from "react-router-dom";
import {
  ContentLayout,
  MainLayout,
  generateDynamicContent,
} from "../../components/templates";
import {
  useFetchStockByNo,
  useFetchStockDetailsByStockNo,
} from "../../config/GetData";
import { SearchInput, Title } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import { useState } from "react";
import { showFormattedDate } from "../../helpers";

const DetailStock2 = () => {
  const { id } = useParams();
  const dataStockNo = useFetchStockByNo(id);
  const dataDetailStockNo = useFetchStockDetailsByStockNo(id);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const StockInfo = ({ label, value }) => (
    <div className="gap-2 flex flex-col ">
      <label>{label}</label>
      <input
        className="bg-gray-100 border border-gray-400"
        type="text"
        defaultValue={value}
        readOnly
      />
    </div>
  );

  const filteredData = filterDataBySearch(dataDetailStockNo, search);
  return (
    <MainLayout>
      <ContentLayout>
        <section className=" col-span-1">
          <button onClick={backToMenu} className="button w-full">
            {`<--`} kembali
          </button>
        </section>
        <section className="col-span-5 bg-white rounded-xl p-3 shadow-lg ">
          <div className="pb-2 flex justify-between">
            <Title>Stock</Title>
            <hr className=" border-slate-950 border-b" />
          </div>
          <div className=" grid grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="gap-2 flex flex-col ">
              <label>Nomor</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.stock_no}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Deskripsi</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.stock_description}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>QTY</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.stock_qty}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col row-span-2 ">
              <label>Catatan (jika ada)</label>
              <textarea
                className="bg-gray-100 border border-gray-300 h-[120px]"
                readOnly
                defaultValue={dataStockNo.note || "-"}
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Kategori</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.category}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Post Username</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.post_username}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Tipe</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.type}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Unit</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                defaultValue={dataStockNo.unit}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col ">
              <label>Post Date</label>
              <input
                className=" bg-gray-100 border border-gray-400"
                value={showFormattedDate(dataStockNo.post_date)}
                readOnly
              />
            </div>

            {/* <CustomInput /> */}
          </div>
        </section>
        <section className="col-span-6 bg-white p-3 rounded-xl shadow-lg flex flex-col gap-4 w-full">
          <div className=" flex justify-between flex-wrap">
            <Title>Details Stock {dataStockNo.stock_no}</Title>
            {/* <div className=" border border-black"> */}
            <SearchInput search={search} onChange={handleSearchChange} />
            {/* </div> */}
          </div>
          <div className=" overflow-x-auto overflow-scroll">
            {generateDynamicContent(
              dataDetailStockNo,
              filteredData,
              <>
                {filteredData.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 max-h-[10vh] w-[1100px]    bg-gray-200 rounded-md flex gap-2 text-md mb-3 overflow-x-auto "
                    >
                      <div className="w-8 ">
                        <p className=" text-gray-500 font-semibold">ID</p>
                        <span className=" font-semibold text-slate-800">
                          {index + 1}
                        </span>
                      </div>
                      <div className="w-40 ">
                        <p className=" text-gray-500 font-semibold">
                          Nama Stock
                        </p>
                        <span className=" font-semibold text-slate-800">
                          {data.stock_detail_description || "-"}
                        </span>
                      </div>
                      <div className="w-16 ">
                        <p className=" text-gray-500 font-semibold">QTY</p>
                        <span className=" font-semibold text-slate-800">
                          {data.qty || "-"}
                        </span>
                      </div>
                      <div className="w-40 ">
                        <p className=" text-gray-500 font-semibold">Merek</p>
                        <span className=" font-semibold text-slate-800">
                          {data.brand || "-"}
                        </span>
                      </div>
                      <div className="w-60 ">
                        <p className=" text-gray-500 font-semibold">Info</p>
                        <span className=" font-semibold text-slate-800">
                          {data.additional_info || "-"}
                        </span>
                      </div>
                      <div className="w-60 ">
                        <p className=" text-gray-500 font-semibold line-clamp-4">
                          Catatan
                        </p>
                        <span className=" font-semibold text-slate-800">
                          {data.note || "-"}
                        </span>
                      </div>
                      {/* <div className="w-40 ">
                    <p className=" text-gray-500 font-semibold">Aksi</p>
                  </div> */}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default DetailStock2;
