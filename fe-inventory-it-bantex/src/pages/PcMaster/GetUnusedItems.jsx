import React, { useState } from "react";
import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { TablePcLine } from "../../components/molecules";
import { useNavigate } from "react-router-dom";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import {
  useFetchItemsUnusedForPcMaster,
  useFetchPcLineData,
} from "../../config/GetData";
import TabBar from "@TabBar";

const GetUnusedItems = () => {
  const [toggleState, setToggleState] = useState(1);
  const dataUnused = useFetchItemsUnusedForPcMaster();
  const dataPcLine = useFetchPcLineData();

  const navigate = useNavigate();

  const backToMenu = () => {
    navigate(-1);
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredDataPcLine = filterDataBySearch(dataPcLine, search);
  const filteredDataUnused = filterDataBySearch(dataUnused, search);
  const tabs = ["Terpakai", "Tersedia"];

  const renderTableBody = () => {
    const tableData =
      toggleState === 1 ? filteredDataPcLine : filteredDataUnused;
    const tableComponent =
      toggleState === 1 ? (
        <TablePcLine data={tableData} />
      ) : (
        <TablePcLine data={tableData} />
      );

    return (
      <>
        <TableHeader>
          <SearchInput
            search={search}
            handleSearchChange={handleSearchChange}
          />
        </TableHeader>
        <TableBody>
          {generateDynamicContent(dataPcLine, tableData, tableComponent)}
        </TableBody>
      </>
    );
  };

  return (
    <MainLayout>
      <ContentLayout>
        <section className="col-span-6 grid grid-cols-6 gap-4 grid-flow-dense w-full">
          <button onClick={backToMenu} className="button h-12 w-12">
            Back
          </button>
          <section className="flex gap-3 col-span-6">
            <TabBar
              tabs={tabs}
              setSearch={setSearch}
              setToggleState={setToggleState}
              toggleState={toggleState}
            />
          </section>
          <div className="col-span-6">
            <section className="grid grid-cols-6 h-[75vh] gap-4 grid-flow-dense">
              <div className="bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6">
                {renderTableBody()}
              </div>
            </section>
          </div>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default GetUnusedItems;
