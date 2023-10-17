import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { TitleTable } from "../../components/atoms";
import { AiFillFileAdd } from "react-icons/ai";
import TableApplicationsForm from "../../components/molecules/Table/TableApplicationsForm";
import { AxiosInstance } from "../../apis/api";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdLocalPrintshop } from "react-icons/md";
import {
  setDataPt,
  setLoadingDivPt,
} from "../../Redux/Feature/DataDivisionAndPT";
import {
  setDataItemsReq,
  setLoadingPengajuan,
} from "../../Redux/Feature/DataPengajuanBarang";
import { TableBody, TableHeader } from "../../components/organisms";

const Applications = () => {
  const dispatch = useDispatch();
  const dataReq = useSelector(
    (state) => state.dataPengajuanBarang.dataItemsReq
  );
  const data = 0;
  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };

  const fetchData = (url, successAction, loadingAction) => {
    AxiosInstance.get(url)
      .then((res) => {
        dispatch(successAction(res.data.data));
        dispatch(loadingAction(false));
      })
      .catch(handleFetchError);
  };

  useEffect(() => {
    fetchData(
      `/pengajuan/req/${username}`,
      setDataItemsReq,
      setLoadingPengajuan
    );
    fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = dataReq.filter((item) => {
    // Gabungkan nilai dari beberapa properti menjadi satu string
    const searchableField = (item.name_pt || "") + (item.name_division || "");
    return searchableField.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="container mx-auto   flex flex-col justify-center items-center gap-5 ">
          {dataReq.length == 0 ? (
            <>
              <p>data belum ada</p>
              <NavLink to={`buat`} className="button flex gap-2 items-center">
                <AiFillFileAdd /> <span>Buat Pengajuan</span>
              </NavLink>
            </>
          ) : (
            <>
              <div className="flex pl-2 gap-2 self-start  w-full">
                {/* <button> */}
                <NavLink
                  to={`/printPage`}
                  className="bg-slate-800 p-2 flex justify-center items-center gap-2 rounded-lg text-white hover:bg-slate-700"
                >
                  <MdLocalPrintshop />
                  Cetak Pengajuan
                </NavLink>
                {/* </button> */}
                {/* <button className="button">
                  <Link>a</Link>
                </button> */}
                <NavLink to={`set-up`} className="button">
                  Set Up
                </NavLink>
              </div>
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
                  <NavLink
                    to={`buat`}
                    className="button flex gap-2 items-center"
                  >
                    <AiFillFileAdd /> <span>Buat Pengajuan</span>
                  </NavLink>
                </TableHeader>
                <TableBody>
                  <TableApplicationsForm data={filteredData} />
                </TableBody>
              </section>
            </>
          )}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Applications;
