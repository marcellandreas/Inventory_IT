import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useEffect, useState } from "react";
import { TablePcMasters } from "../../components/molecules";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { filterDataBySearch } from "../../helpers/filters";
import SearchNotFound from "../../assets/images/search-not-found.jpg";
import DataNotFound from "../../assets/images/data-not-found.jpg";
import { fetchPcMasterData } from "../../Redux/Feature/DataPcMaster";
import { generateDynamicContent } from "../../components/templates/GenerateDynamicContent";

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
    <Sidebar>
      <LayoutContentDashboard>
        <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
          {/* Header Kontent */}
          <section>
            <button onClick={backToMenu}>
              <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
            </button>
          </section>

          <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
            <TableHeader>
              <TitleTable>Data PC/Laptop </TitleTable>
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
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default GetAllPcMaster;
