import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../../apis/api";
import {
  setDataItemsReq,
  setLoadingPengajuan,
} from "../../../Redux/Feature/DataPengajuanBarang";
// import {
//   setDataPt,
//   setLoadingDivPt,
// } from "../../../Redux/Feature/DataDivisionAndPT";
import { ShowTable, TableBody, TableHeader } from "../../organisms";
import TableApplicationsForm from "../../molecules/Table/TableApplicationsForm";
import generateDynamicContent from "../GenerateDynamicContent";
import { SearchInput } from "../../atoms";
import { filterDataBySearch } from "../../../helpers";

const UsersFormReq = ({ setId, setDeleteModal }) => {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();

  const dataReq = useSelector(
    (state) => state.dataPengajuanBarang.dataItemsReq
  );
  const [dataItem, setDataItem] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    AxiosInstance.get("/form")
      .then((res) => {
        setDataItem(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = (url, successAction, loadingAction) => {
      AxiosInstance.get(url)
        .then((res) => {
          dispatch(successAction(res.data.data));
          dispatch(loadingAction(false));
        })
        .catch(handleFetchError);
    };

    const handleFetchError = (err) => {
      console.error("Terjadi kesalahan dalam memproses data:", err);
      alert("Terjadi kesalahan dalam memproses data");
    };

    fetchData(
      `/form/username/${username}`,
      setDataItemsReq,
      setLoadingPengajuan
    );
    // fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch, username]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataReq, search);

  return (
    <ShowTable gap={6}>
      <TableHeader>
        <SearchInput search={search} onChange={handleSearchChange} />
      </TableHeader>
      <TableBody>
        {generateDynamicContent(
          dataReq,
          filteredData,
          <TableApplicationsForm
            data={filteredData}
            setId={setId}
            setDeleteModal={setDeleteModal}
          />
        )}
      </TableBody>
    </ShowTable>
  );
};

export default UsersFormReq;
