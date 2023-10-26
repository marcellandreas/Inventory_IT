import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillFileAdd } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TitleTable } from "../../atoms";
import { TableHeader, TableBody } from "../../organisms";
import TableApplicationsForm from "../../molecules/Table/TableApplicationsForm";

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
      return <p>kosong</p>;
    } else if (toggleState === 2 && needApproved.length === 0) {
      return <p>kosong</p>;
    } else if (toggleState === 1 && allData.length === 0) {
      return <p>kosong</p>;
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

  return (
    <section className="grid grid-cols-6 gap-4 grid-flow-dense ">
      <div className="self-start flex justify-between w-full col-span-6">
        <div className="flex pl-2 gap-2 self-start order-2">
          <NavLink
            to={`/printPage`}
            className="bg-slate-800 p-2 flex justify-center items-center gap-2 rounded-lg text-white hover:bg-slate-700"
          >
            <MdLocalPrintshop />
            Cetak Pengajuan A
          </NavLink>
          <NavLink to={`set-up`} className="button">
            Set Up
          </NavLink>
        </div>
        <section className="flex gap-2 p-2 bg-slate-200 h-12 mb-5 rounded-lg order-1">
          {["All", "Need Approved", "Approved"].map((label, index) => (
            <button
              key={index}
              onClick={() => setToggleState(index + 1)}
              className={`${
                toggleState === index + 1
                  ? "bg-slate-500 hover:bg-slate-700"
                  : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
              } rounded-md p-1 min-w-[100px]`}
            >
              {label}
            </button>
          ))}
        </section>
      </div>
      <div className="col-span-6">
        {/* <section className="w-[82vw] bg-slate-200 backdrop-blur-md"> */}
        <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
          <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
            <TableHeader>
              <TitleTable>Data Pengajuan Barang</TitleTable>
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
            <TableBody>{renderTableData()}</TableBody>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AdminsFormReq;
