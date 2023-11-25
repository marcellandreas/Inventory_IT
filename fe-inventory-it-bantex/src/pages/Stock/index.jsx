import React, { useState } from "react";
import { SearchInput } from "../../components/atoms";
import {
  TableStocks,
  Loading,
  FormDelStock,
  Print,
} from "../../components/molecules";
import {
  TableBody,
  TableHeader,
  ShowModal,
  ShowTable,
} from "../../components/organisms";
import {
  ContentLayout,
  MainLayout,
  generateDynamicContent,
} from "../../components/templates";
import { useSelector } from "react-redux";
import { filterDataBySearch, Modals } from "../../helpers";
import { useFetchStocks } from "../../config/GetData";

const StockPage = () => {
  const [id, setId] = useState("");
  const dataStock = useFetchStocks();
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
            <>
              <section className="flex col-span-6 cards gap-2 p-2 place-self-end">
                <Print
                  titleDocument="Items"
                  PrintPDF={<TableStocks data={dataStock} />}
                  PrintCSV={dataStock}
                />
              </section>
              <ShowTable gap={6}>
                <TableHeader>
                  <SearchInput
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
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
              </ShowTable>
            </>
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
