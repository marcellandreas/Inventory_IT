import {
  MainLayout,
  ContentLayout,
  generateDynamicContent,
} from "../../components/templates";
import { useEffect, useState } from "react";
import { TablePcMasters } from "../../components/molecules";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { TableBody, TableHeader } from "../../components/organisms";
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
        <section className="col-span-6 mx-auto  flex flex-col  bg-slate-200 backdrop-blur-md rounded-3xl  w-full">
          <TableHeader>
            <SearchInput
              search={search}
              handleSearchChange={handleSearchChange}
            />
          </TableHeader>
          <TableBody>
            {generateDynamicContent(
              pcmasterData,
              filteredData,
              <TablePcMasters data={filteredData} />
            )}
          </TableBody>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default GetAllPcMaster;
