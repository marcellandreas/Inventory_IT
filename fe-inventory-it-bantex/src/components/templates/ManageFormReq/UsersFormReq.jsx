import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../../apis/api";
import {
  setDataItemsReq,
  setLoadingPengajuan,
} from "../../../Redux/Feature/DataPengajuanBarang";
import {
  setDataPt,
  setLoadingDivPt,
} from "../../../Redux/Feature/DataDivisionAndPT";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { TableBody, TableHeader } from "../../organisms";
import image from "../../../assets/images/form-concept.jpg";
import TableApplicationsForm from "../../molecules/Table/TableApplicationsForm";
import SearchNotFound from "../../../assets/images/search-not-found.jpg";
import generateDynamicContent from "../GenerateDynamicContent";

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
    fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch, username]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = dataReq.filter((item) => {
    const searchableField = (item.name_pt || "") + (item.name_division || "");
    return searchableField.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className=" col-span-6 mx-auto w-[82vw] bg-slate-200 backdrop-blur-md">
      <TableHeader>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
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
    </section>
  );
};

export default UsersFormReq;
