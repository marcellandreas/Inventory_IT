import React, { useState } from "react";
import { SearchInput } from "../../components/atoms";
import { TableStocks, Loading, FormDelStock } from "../../components/molecules";
import { TableBody, TableHeader, ShowModal } from "../../components/organisms";
import {
  ContentLayout,
  MainLayout,
  generateDynamicContent,
} from "../../components/templates";
import { useSelector } from "react-redux";
import { filterDataBySearch } from "../../helpers/filters";
import DropdownPrint from "../../components/molecules/Dropdown/DropdownPrint";
import Modals from "../../helpers/modals";
import { MdLocalPrintshop } from "react-icons/md";

const StockPage = () => {
  const [id, setId] = useState("");
  const dataStock = useSelector((state) => state.stocks.data);
  const isLoading = useSelector((state) => state.stocks.isLoading);
  const [showDropdown, setShowDropdown] = useState(false);

  // melakuan search
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataStock, search);
  const { modalState, showModal, closeModal } = Modals();

  return (
    <>
      <MainLayout>
        <ContentLayout>
          {isLoading ? (
            <Loading />
          ) : (
            <section className=" col-span-6 bg-gray-200 rounded-xl min-h-[50px]">
              <TableHeader>
                <SearchInput
                  search={search}
                  handleSearchChange={handleSearchChange}
                />

                <div className="flex  gap-4 col-span-6  justify-end order-2 sm:order-3">
                  {showDropdown && (
                    <DropdownPrint dataCsv={dataStock} dataPdf={dataStock} />
                  )}
                  <button
                    className="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <MdLocalPrintshop />
                    Print Stock
                  </button>
                </div>
              </TableHeader>
              <TableBody>
                {generateDynamicContent(
                  dataStock,
                  filteredData,
                  <TableStocks
                    data={filteredData}
                    setDeleteModal={() => showModal("delete")}
                    setId={setId}
                  />
                )}
              </TableBody>
            </section>
          )}
        </ContentLayout>
      </MainLayout>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDelStock onClose={() => closeModal("delete")} id={id} />
      </ShowModal>
    </>
  );
};

export default StockPage;
