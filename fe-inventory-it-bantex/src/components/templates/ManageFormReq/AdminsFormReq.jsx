import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdLocalPrintshop } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SearchInput } from "../../atoms";
import { TableHeader, TableBody } from "../../organisms";
import { TableApplicationsForm } from "../../molecules";
import TabBar from "@TabBar";

const AdminsFormReq = ({ setId, setDeleteModal }) => {
  const [toggleState, setToggleState] = useState(1);

  const allData = useSelector((state) => state.dataSliceItemReq.allData);
  const needApproved = useSelector(
    (state) => state.dataSliceItemReq.needApproved
  );
  const allApproved = useSelector((state) => state.dataSliceItemReq.approved);

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

    if (toggleState === 3 && allApproved.length === 0) {
      return (
        <div className=" min-h-[60vh] flex justify-center items-center">
          <div>Belum ada Pengajuan / Penerimaan Barang</div>
        </div>
      );
    } else if (toggleState === 2 && needApproved.length === 0) {
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
          ? needApproved
          : toggleState === 3
          ? allApproved
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
      <section className="col-span-6 bg-slate-200  h-[75vh]  rounded-xl min-h-[50px] ">
        <TableHeader>
          <SearchInput
            search={search}
            handleSearchChange={handleSearchChange}
          />
          <div className="flex pl-2 gap-2 self-start order-2 items-center sm:order-3">
            <NavLink
              to={`/printPage`}
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
      </section>
    </>
  );
};

export default AdminsFormReq;
