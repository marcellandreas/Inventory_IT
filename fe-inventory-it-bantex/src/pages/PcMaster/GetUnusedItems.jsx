import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { TablePcLine } from "../../components/molecules";
import { useNavigate } from "react-router-dom";
import {
  fechtPcLineData,
  fetchItemsUnusedForPcMaster,
} from "../../Redux/Feature/DataPcMaster";
import { useDispatch, useSelector } from "react-redux";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import { generateDynamicContent } from "../../components/templates/GenerateDynamicContent";

const GetUnusedItems = () => {
  const [toggleState, setToggleState] = useState(1);

  const dispatch = useDispatch();

  const dataUnused = useSelector((state) => state.pcmaster.dataUnused);
  const dataPcLine = useSelector((state) => state.pcmaster.dataPcLine);

  useEffect(() => {
    dispatch(fetchItemsUnusedForPcMaster());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fechtPcLineData());
  }, [dispatch]);

  // state modals in stock

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

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="grid grid-cols-6 gap-4 grid-flow-dense w-full ">
          <section className="flex  gap-3 col-span-6">
            <button onClick={backToMenu} className="button h-12 w-12">
              Back
            </button>
            <section className="flex flex-wrap gap-2 p-2 bg-slate-200 mb-5 rounded-lg order-1">
              {["Terpakai", "Tersedia"].map((label, index) => (
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
          </section>
          {toggleState === 1 ? (
            <div className="col-span-6">
              <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
                <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
                  <TableHeader>
                    <TitleTable>Tabel Komponen Terpakai</TitleTable>
                    <SearchInput
                      search={search}
                      handleSearchChange={handleSearchChange}
                    />
                  </TableHeader>
                  <TableBody>
                    {generateDynamicContent(
                      dataPcLine,
                      filteredDataPcLine,
                      <TablePcLine data={filteredDataPcLine} />
                    )}
                  </TableBody>
                </div>
              </section>
            </div>
          ) : (
            <div className="col-span-6">
              <section className="grid grid-cols-6 h-[75vh]  gap-4 grid-flow-dense ">
                <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-4 col-span-6 ">
                  <TableHeader>
                    <TitleTable>Tabel Komponen Terpakai</TitleTable>
                    <SearchInput
                      search={search}
                      handleSearchChange={handleSearchChange}
                    />
                  </TableHeader>
                  <TableBody>
                    {generateDynamicContent(
                      dataPcLine,
                      filteredDataPcLine,
                      <TablePcLine data={filteredDataUnused} />
                    )}
                  </TableBody>
                </div>
              </section>
            </div>
          )}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default GetUnusedItems;
