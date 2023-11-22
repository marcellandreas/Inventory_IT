import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../../apis/api";
import {
  setDataPt,
  setLoadingDivPt,
} from "../../../Redux/Feature/DataDivisionAndPT";
import { SearchInput } from "../../atoms";
import { NavLink } from "react-router-dom";
import { MdLocalPrintshop } from "react-icons/md";
import { ShowTable, TableBody, TableHeader } from "../../organisms";
import { TableApplicationsForm } from "../../molecules";
import { useEffect, useState } from "react";
import TabBar from "../../organisms/TabBar";
import { useFetchNamePt } from "../../../config/GetData";

const ManagersFormReq = ({ setId, setDeleteModal }) => {
  const [toggleState, setToggleState] = useState(1);
  const allData = useSelector((state) => state.dataSliceItemReq.allData);
  const allApproved2 = useSelector((state) => state.dataSliceItemReq.approved2);
  const needApproved2 = useSelector(
    (state) => state.dataSliceItemReq.needApproved2
  );

  const dispatch = useDispatch();

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
    fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch]);

  const namePt = useFetchNamePt();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const renderTableData = () => {
    const filteredData = allData.filter((item) => {
      const searchableField =
        (item.name_pt || "") + (item.name_division || "") + (item.status || "");
      return searchableField.toLowerCase().includes(search.toLowerCase());
    });

    if (toggleState === 3 && allApproved2.length === 0) {
      return (
        <div className=" min-h-[60vh] flex justify-center items-center">
          <div>Belum ada Pengajuan / Penerimaan Barang</div>
        </div>
      );
    } else if (toggleState === 2 && needApproved2.length === 0) {
      return (
        <div className=" min-h-[60vh] flex justify-center items-center">
          <div>Belum ada Pengajuan / Penerimaan Barang</div>
        </div>
      );
    } else if (toggleState === 1 && allData.length === 0) {
      return (
        <div className=" min-h-[60vh] flex justify-center items-center">
          <div>Belum ada Pengajuan / Penerimaan Barang</div>
        </div>
      );
    } else {
      const tableData =
        toggleState === 1
          ? filteredData
          : toggleState === 2
          ? needApproved2
          : toggleState === 3
          ? allApproved2
          : [];

      return (
        <TableApplicationsForm
          data={tableData}
          setId={setId}
          setDeleteModal={setDeleteModal}
        />
      );
    }
  };

  const tabs = ["Semua", "Butuh Approved", "Approved"];
  return (
    <>
      <section className="self-start flex-wrap flex justify-between w-full col-span-6 ">
        <TabBar
          tabs={tabs}
          setSearch={setSearch}
          setToggleState={setToggleState}
          toggleState={toggleState}
        />
      </section>
      <ShowTable gap={6}>
        <TableHeader>
          <SearchInput
            search={search}
            handleSearchChange={handleSearchChange}
          />
          <div className="flex pl-2 gap-2 self-start order-2 items-center sm:order-3">
            <NavLink
              to={`print`}
              className="bg-slate-800 p-2 flex justify-center items-center gap-2 rounded-lg text-white hover:bg-slate-700"
            >
              <MdLocalPrintshop />
              Print Pengajuan
            </NavLink>
            <NavLink to={`set-up`} className="button">
              Set Up
            </NavLink>
          </div>
        </TableHeader>
        <TableBody>{renderTableData()}</TableBody>
      </ShowTable>
    </>
  );
};

export default ManagersFormReq;
