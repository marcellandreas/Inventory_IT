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
import { Title, TitleTable } from "../../atoms";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { TableBody, TableHeader } from "../../organisms";
import image from "../../../assets/images/form-concept.jpg";
import TableApplicationsForm from "../../molecules/Table/TableApplicationsForm";

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

  const renderNoDataMessage = () => (
    <div className="min-h-[70vh] flex justify-center gap-10 items-center flex-col">
      <img src={image} alt="" className="w-80 h-80" />
      <p class="text-sm font-light sm:text-base sm:font-normal md:text-lg md:font-medium lg:text-xl lg:font-semibold xl:text-2xl xl:font-semibold">
        Data belum tersedia. Anda bisa mulai mengisi data yang diperlukan.
      </p>
      <NavLink to={`buat`} className="button flex gap-2 items-center">
        <AiFillFileAdd /> <span>Buat Pengajuan</span>
      </NavLink>
    </div>
  );

  return (
    <section className="container mx-auto flex flex-col justify-center items-center gap-5">
      {dataReq.length === 0 ? (
        renderNoDataMessage()
      ) : (
        <>
          <section className="w-[82vw] bg-slate-200 backdrop-blur-md">
            <TableHeader>
              <TitleTable>Data Pengajuan Barang</TitleTable>
              <div className="input-group">
                <input
                  type="search"
                  placeholder="Search Data..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <NavLink to={`buat`} className="button flex gap-2 items-center">
                <AiFillFileAdd /> <span>Buat Pengajuan</span>
              </NavLink>
            </TableHeader>
            <TableBody>
              <TableApplicationsForm
                data={filteredData}
                setId={setId}
                setDeleteModal={setDeleteModal}
              />
            </TableBody>
          </section>
        </>
      )}
    </section>
  );
};

export default UsersFormReq;
