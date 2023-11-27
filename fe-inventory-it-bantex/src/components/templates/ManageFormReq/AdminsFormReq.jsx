import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdLocalPrintshop } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SearchInput, TitleTable } from "../../atoms";
import {
  TableHeader,
  TableBody,
  ShowTable,
  ShowContent,
} from "../../organisms";
import { TableApplicationsForm } from "../../molecules";
import TabBar from "@TabBar";
import { filterDataBySearch } from "../../../helpers";
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
      <section className=" col-span-6 flex overflow-x-auto gap-3 sm:col-span-4">
        <TabBar
          tabs={tabs}
          setSearch={setSearch}
          setToggleState={setToggleState}
          toggleState={toggleState}
        />
      </section>
      <section className=" col-span-6 sm:col-span-2 place-self-end flex gap-2">
        <NavLink
          to={`print`}
          className="bg-slate-800 p-2 flex justify-center items-center gap-2 rounded-lg text-white hover:bg-slate-700"
        >
          <MdLocalPrintshop />
          Print Pengajuan
        </NavLink>
      </section>

      <ShowTable gap={6}>
        <TableHeader>
          <TitleTable
            count={
              toggleState === 1
                ? allData.length
                : toggleState === 2
                ? needApproved.length
                : toggleState === 3
                ? allApproved.length
                : null
            }
          >
            Data Pengajuan
          </TitleTable>
          <SearchInput search={search} onChange={handleSearchChange} />
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
