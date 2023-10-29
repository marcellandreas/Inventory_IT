import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useState } from "react";
import { TablePcMasters } from "../../components/molecules";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import { filterDataBySearch } from "../../helpers/filters";

const GetAllPcMaster = () => {
  const [id, setId] = useState("");
  const dataPcMaster = useSelector((state) => state.dataPc.dataPcMaster);

  if (!dataPcMaster) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataPcMaster, search);

  return (
    <>
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
                {dataPcMaster.length === 0 ? (
                  <div className="min-h-[60vh] flex justify-center items-center">
                    <div> Tidak Ada Data PC/LAPTOP Tersedia</div>
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="min-h-[60vh] flex justify-center items-center">
                    <div>PC/Laptop Tidak Tersedia</div>
                  </div>
                ) : (
                  <div className="min-h-[60vh] ">
                    <TablePcMasters data={filteredData} />
                  </div>
                )}
              </TableBody>
            </section>
          </section>
        </LayoutContentDashboard>
      </Sidebar>
    </>
  );
};

export default GetAllPcMaster;
