import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../../apis/api";

import {
  setDataPt,
  setLoadingDivPt,
} from "../../../Redux/Feature/DataDivisionAndPT";
import { TitleTable } from "../../atoms";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { TableBody, TableHeader } from "../../organisms";
import TableApplicationsForm from "../../molecules/Table/TableApplicationsForm";
import { useEffect, useState } from "react";

const AdminsFormReq = () => {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch();
  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };
  const fetchData = (url, successAction, loadingAction) => {
    AxiosInstance.get(url)
      .then((res) => {
        dispatch(successAction(res.data.data));
        dispatch(loadingAction(true));
      })
      .catch(handleFetchError);
  };

  const allData = useSelector((state) => state.dataSliceItemReq.allData);
  const needApproved = useSelector(
    (state) => state.dataSliceItemReq.needApproved
  );
  const allApproved = useSelector((state) => state.dataSliceItemReq.approved);

  console.log(needApproved);

  useEffect(() => {
    fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = allData.filter((item) => {
    // Gabungkan nilai dari beberapa properti menjadi satu string
    const searchableField =
      (item.name_pt || "") + (item.name_division || "") + (item.status || "");
    return searchableField.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <section className="grid grid-cols-6  gap-4 grid-flow-dense  ">
      {/* {dataReq.length == 0 ? (
        <div className="min-h-[70vh] flex justify-center gap-10 items-center flex-col">
          <Title>Tidak Ditemukan Surat Pengajuan </Title>
          <NavLink to={`buat`} className="button flex gap-2 items-center">
            <AiFillFileAdd /> <span>Buat Pengajuan</span>
          </NavLink>
        </div>
      ) : ( */}
      <div className=" self-start flex justify-between w-full col-span-6">
        <div className="flex pl-2 gap-2 self-start   order-2">
          <NavLink
            to={`/printPage`}
            className="bg-slate-800 p-2 flex justify-center items-center gap-2 rounded-lg text-white hover:bg-slate-700"
          >
            <MdLocalPrintshop />
            Cetak Pengajuan A
          </NavLink>
          {/* </button> */}
          <NavLink to={`set-up`} className="button">
            Set Up
          </NavLink>
        </div>
        <section className="flex gap-2 p-2 bg-slate-200  h-12 mb-5 rounded-lg order-1">
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
            } rounded-md p-1 min-w-[160px]`}
          >
            Need Approved
          </button>
          <button
            onClick={() => {
              setToggleState(3);
            }}
            className={`${
              toggleState === 3
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-1 min-w-[160px]`}
          >
            Approved
          </button>
        </section>
      </div>
      <div className="col-span-6">
        {(toggleState == 3 && allApproved.length == 0) ||
        (toggleState == 2 && needApproved.length == 0) ||
        (toggleState == 1 && allData.length == 0) ? (
          <p>kosong</p>
        ) : (
          <section className="w-[82vw] bg-slate-200 backdrop-blur-md">
            <TableHeader>
              <TitleTable>Tabel Pengajuan Barang</TitleTable>
              <div className="input-group">
                <input
                  type="search"
                  placeholder="Search Data..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <NavLink to={`buat`} className="button flex gap-2 items-center">
                <AiFillFileAdd /> <span>Buat Pengajuan</span>
              </NavLink>
            </TableHeader>
            <TableBody>
              {toggleState == 1 ? (
                <TableApplicationsForm data={filteredData} />
              ) : toggleState == 2 ? (
                <TableApplicationsForm data={needApproved} />
              ) : toggleState == 3 ? (
                <TableApplicationsForm data={allApproved} />
              ) : null}
            </TableBody>
          </section>
        )}
      </div>

      {/* )} */}
    </section>
  );
};

export default AdminsFormReq;
