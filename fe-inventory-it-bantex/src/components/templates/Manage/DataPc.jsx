import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../apis/api";
import {
  FormAddModalPcMaster,
  FormDeleteModalPcMaster,
  FormEditModalPcMaster,
} from "../../molecules";
import { NavLink } from "react-router-dom";
import ShowModal from "../../organisms/Show/ShowModals";
import DataComponentsPc from "./DataComponentsPc";
import {
  MdEditNote,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";
import Loading from "../../molecules/Loading";
import { TitleTable } from "../../atoms";
import { TableHeader } from "../../organisms";
import Modals from "../../../helpers/modals";
import { showFormattedDate } from "../../../helpers/showFormattedDate";

const DataPc = () => {
  const [formValues, setFormValues] = useState({
    id_pc_master: "",
    pc_no: "",
    pc_description: "",
    unit: "",
    category: "",
    status: "",
    pc_location: "",
    note: "",
    date_registration: "",
    date_expired: "",
    pc_spectification: "",
    post_username: "",
    post_date: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataPcComponent, setDataPcComponent] = useState([]);
  const { modalState, showModal, closeModal } = Modals();

  // get LocalStorage
  const toke = localStorage.getItem("GetIdFromTable");
  useEffect(() => {
    setFormValues({ ...formValues, pc_no: toke });
  }, []);

  const [dataPcMaster, setPcMaster] = useState([]);
  useEffect(() => {
    AxiosInstance.get("/pcmaster").then((res) => {
      setPcMaster(res.data.data);
      setIsLoading(false);
    });
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (formValues.pc_no) {
        const res = await AxiosInstance.get(`pcmaster/${formValues.pc_no}`);
        const itemData = res.data.data;

        if (itemData.length > 0) {
          const mappedItemData = {
            id_pc_master: itemData[0].id_pc_master,
            pc_no: itemData[0].pc_no,
            pc_description: itemData[0].pc_description,
            unit: itemData[0].unit,
            category: itemData[0].category,
            status: itemData[0].status,
            pc_location: itemData[0].pc_location,
            note: itemData[0].note,
            date_registration: itemData[0].date_registration,
            date_expired: itemData[0].date_expired,
            pc_spectification: itemData[0].pc_spectification,
            post_username: itemData[0].post_username,
            post_date: itemData[0].post_date,
          };
          setFormValues(mappedItemData);
        }
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formValues.pc_no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    AxiosInstance.get(`pcline/${formValues.pc_no}`).then((res) => {
      setDataPcComponent(res.data.data);
      setIsLoading(false);
    });
  }, [formValues.pc_no, isLoading]);

  const id = formValues.id_pc_master;
  const pcno = formValues.pc_no;

  const handleNavLinkClick = () => {
    localStorage.removeItem("GetIdFromTable");
  };

  const options = [
    <option value={formValues.pc_no || null}>
      {formValues.pc_no || null}
    </option>,
    ...dataPcMaster.map((stock, i) => (
      <option key={i} value={stock.pc_no}>
        {stock.pc_no}
      </option>
    )),
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="w-full col-span-6 flex-col flex gap-9  ">
          <section className="cards rounded-3xl shadow-md">
            <TableHeader>
              <TitleTable>Data Master Komputer</TitleTable>
              <div className="flex gap-2">
                <button className="button" onClick={() => showModal("add")}>
                  <BsDatabaseFillAdd />
                </button>
                <button className="button" onClick={() => showModal("edit")}>
                  <MdEditNote />
                </button>
                <button onClick={() => showModal("delete")} className="button">
                  <MdDelete />
                </button>
              </div>
            </TableHeader>
            {/* Data */}
            <section className="gap-2 max-h-[216px] p-4 justify-between   flex  flex-wrap  overflow-hidden overflow-y-auto">
              <div className="gap-2 flex flex-col w-60">
                <label className="min-w-[140px]">Kode Pc</label>
                <div className="flex justify-end items-end gap-2">
                  <select
                    className="w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm h-8"
                    onChange={handleChange}
                    name="pc_no"
                  >
                    {options}
                  </select>
                  <NavLink
                    to={`detail`}
                    className="detail_all_pc_master"
                    onClick={handleNavLinkClick}
                  >
                    ...
                  </NavLink>
                </div>
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Deskripsi</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  defaultValue={formValues.pc_description}
                  readOnly
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Satuan</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  defaultValue={formValues.unit}
                  readOnly
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Kategori</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  readOnly
                  value={formValues.category}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Lokasi Pc</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  readOnly
                  defaultValue={formValues.pc_location}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Status </label>
                <div
                  className="flex flex-wrap gap-2 items-center rounded-md h-9"
                  readOnly
                >
                  <input
                    type="radio"
                    defaultValue="used"
                    checked={formValues.status === "used"}
                    className="border-2 border-slate-800 rounded-md p-2"
                  />
                  <label className="ml-2">used</label>
                  <input
                    type="radio"
                    defaultValue="new"
                    checked={formValues.status === "new"}
                    className="border-2 border-slate-800 rounded-md p-2"
                  />
                  <label className="ml-2">Baru</label>
                  <input
                    type="radio"
                    defaultValue="reused"
                    checked={formValues.status === "reused"}
                    className="border-2 border-slate-800 rounded-md p-2"
                  />
                  <label className="ml-2">Reused</label>
                </div>
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Tanggal Registrasi</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  readOnly
                  defaultValue={formValues.date_registration || "-"}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Tanggal Kadaluarsa (Rusak)</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  value={`${
                    showFormattedDate(formValues.date_expired) || "-"
                  } `}
                  readOnly
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Catatan (jika ada)</label>
                <textarea
                  className="bg-gray-100 border border-gray-300 h-[120px]"
                  readOnly
                  defaultValue={formValues.note}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Spesifikasi </label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  type="text"
                  readOnly
                  defaultValue={formValues.pc_spectification}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Created at: </label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  readOnly
                  type="text"
                  value={`${showFormattedDate(formValues.post_date)}`}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Username Upload</label>
                <input
                  className=" bg-gray-100 border border-gray-300"
                  readOnly
                  type="text"
                  defaultValue={formValues.post_username}
                />
              </div>
            </section>
          </section>
          <DataComponentsPc
            dataPcComponent={dataPcComponent}
            pcno={pcno}
            formValues={formValues}
            setIsLoading={setIsLoading}
          />
        </section>
      )}
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <FormAddModalPcMaster
          onClose={() => closeModal("add")}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <FormEditModalPcMaster
          onClose={() => closeModal("edit")}
          setIsLoading={setIsLoading}
          id={id}
          pcno={pcno}
        />
      </ShowModal>
      <ShowModal
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <FormDeleteModalPcMaster
          onClose={() => closeModal("delete")}
          setIsLoading={setIsLoading}
          id={id}
          pcno={pcno}
        />
      </ShowModal>
    </>
  );
};

export default DataPc;
