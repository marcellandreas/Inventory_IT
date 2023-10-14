import { useEffect, useState } from "react";
import LayoutContentDashboard from "../../components/templates/LayoutContentDashboard/index";
import Sidebar from "../../components/templates/Sidebar";
import { Title } from "../../components/atoms";
import { AiFillFileAdd } from "react-icons/ai";
import TableApplicationsForm from "../../components/molecules/Table/TableApplicationsForm";
import { AxiosInstance } from "../../apis/api";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataPt,
  setLoadingDivPt,
} from "../../Redux/Feature/DataDivisionAndPT";
import {
  setDataItemsReq,
  setLoadingPengajuan,
} from "../../Redux/Feature/DataPengajuanBarang";

const Applications = () => {
  const dispatch = useDispatch();
  const dataReq = useSelector(
    (state) => state.dataPengajuanBarang.dataItemsReq
  );
  const data = 0;
  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };

  const fetchData = (url, successAction, loadingAction) => {
    AxiosInstance.get(url)
      .then((res) => {
        dispatch(successAction(res.data.data));
        dispatch(loadingAction(false));
      })
      .catch(handleFetchError);
  };

  useEffect(() => {
    fetchData("/pengajuan", setDataItemsReq, setLoadingPengajuan);
    fetchData("/app", setDataPt, setLoadingDivPt);
  }, [dispatch]);

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
          {dataReq.length == 0 ? (
            <>
              <p>data belum ada</p>
              <NavLink to={`buat`} className="button flex gap-2 items-center">
                <AiFillFileAdd /> <span>Buat Pengajuan</span>
              </NavLink>
            </>
          ) : (
            <section className="w-[82vw] bg-slate-400 backdrop-blur-md">
              <section className="table__header">
                <Title>Tabel `Form Pengajuan Barang`</Title>
                <div className="input-group">
                  <input type="search" placeholder="Search Data..." />
                </div>
                <NavLink to={`buat`} className="button flex gap-2 items-center">
                  <AiFillFileAdd /> <span>Buat Pengajuan</span>
                </NavLink>
              </section>
              <section className="table__body">
                <TableApplicationsForm />
              </section>
            </section>
          )}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Applications;
