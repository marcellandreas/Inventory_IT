import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdLocalPrintshop } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SearchInput } from "../../atoms";
import { TableHeader, TableBody, ShowTable } from "../../organisms";
import { TableApplicationsForm } from "../../molecules";
import TabBar from "@TabBar";
import { filterDataBySearch } from "../../../helpers/filters";
import generateDynamicContent from "../GenerateDynamicContent";

const AdminsFormReq = ({ setId, id, setDeleteModal }) => {
  const [toggleState, setToggleState] = useState(1);
  const [search, setSearch] = useState("");

  const allData = useSelector((state) => state.dataSliceItemReq.allData);
  const needApproved = useSelector(
    (state) => state.dataSliceItemReq.needApproved
  );
  const allApproved = useSelector((state) => state.dataSliceItemReq.approved);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(allData, search);
  const filteredAllApprov = filterDataBySearch(allApproved, search);
  const filteredNeedApprov = filterDataBySearch(needApproved, search);

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
        <TableBody>
          {toggleState === 1 &&
            generateDynamicContent(
              allData,
              filteredData,
              <TableApplicationsForm
                data={allData}
                setId={setId}
                setDeleteModal={setDeleteModal}
              />
            )}
          {toggleState === 2 &&
            generateDynamicContent(
              needApproved,
              filteredNeedApprov,
              <TableApplicationsForm
                data={needApproved}
                setId={setId}
                setDeleteModal={setDeleteModal}
              />
            )}
          {toggleState === 3 &&
            generateDynamicContent(
              allApproved,
              filteredAllApprov,
              <TableApplicationsForm
                data={allApproved}
                setId={setId}
                setDeleteModal={setDeleteModal}
              />
            )}
        </TableBody>
      </ShowTable>
    </>
  );
};

export default AdminsFormReq;
