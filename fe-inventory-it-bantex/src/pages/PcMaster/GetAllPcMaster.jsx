import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { useEffect, useState } from "react";
import { TablePcMasters } from "../../components/molecules";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ShowTable, TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { filterDataBySearch } from "../../helpers/filters";
import { fetchPcMasterData } from "../../Redux/Feature/DataPcMaster";

const GetAllPcMaster = () => {
  const dispatch = useDispatch();
  const pcmasterData = useSelector((state) => state.pcmaster.dataPcmaster);

  useEffect(() => {
    dispatch(fetchPcMasterData());
  }, [dispatch]);

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(pcmasterData, search);

  return (
    <MainLayout>
      <ContentLayout>
        <section className=" col-span-6">
          <button onClick={backToMenu}>
            <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
          </button>
        </section>
        <ShowTable gap={6}>
          <TableHeader>
            <TitleTable count={pcmasterData.length}>Data Pc Master</TitleTable>
            <SearchInput search={search} onChange={handleSearchChange} />
          </TableHeader>
          <TableBody>
            {generateDynamicContent(
              pcmasterData,
              filteredData,
              <TablePcMasters data={filteredData} />
            )}
          </TableBody>
        </ShowTable>
      </ContentLayout>
    </MainLayout>
  );
};

export default GetAllPcMaster;
