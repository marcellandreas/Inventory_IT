import React, { useState } from "react";
import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { TablePcLine } from "../../components/molecules";
import { useNavigate } from "react-router-dom";
import { ShowTable, TableBody, TableHeader } from "../../components/organisms";
import { BackButton, SearchInput, TitleTable } from "../../components/atoms";
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
          <TitleTable count={dataPcLine.length}>Data Pc Components</TitleTable>
          <SearchInput search={search} onChange={handleSearchChange} />
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
        <section className="col-span-6">
          <BackButton onClick={backToMenu} />
        </section>
        <section className="flex gap-3 col-span-6">
          <TabBar
            tabs={tabs}
            setSearch={setSearch}
            setToggleState={setToggleState}
            toggleState={toggleState}
          />
        </section>
        <ShowTable gap={6}>{renderTableBody()}</ShowTable>
      </ContentLayout>
    </MainLayout>
  );
};

export default GetUnusedItems;
