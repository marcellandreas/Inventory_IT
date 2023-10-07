import { useEffect, useState } from "react";
import Title from "../../atoms/Text/Title";
import { AxiosInstance } from "../../../apis/api";
import {
  FormAddModalPcMaster,
  FormDeleteModalPcMaster,
  FormEditModalPcMaster,
} from "../../molecules";
import { NavLink } from "react-router-dom";
import ShowModal from "../../organisms/ShowModal";
import DataComponentsPc from "./DataComponentsPc";

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

  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [dataPcMaster, setPcMaster] = useState([]);
  useEffect(() => {
    AxiosInstance.get("/pcmaster")
      .then((res) => {
        setPcMaster(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const id = formValues.id_pc_master;

  useEffect(() => {
    AxiosInstance.get(`pcline/${formValues.pc_no}`).then((res) =>
      setDataPcComponent(res.data.data)
    );
  }, [id]);

  useEffect(() => {
    AxiosInstance.get(`pcmaster/${formValues.id_pc_master}`).then((res) => {
      const itemData = res.data.data;
      const mappedItemData = itemData.map((pcMaster) => ({
        id_pc_master: pcMaster.id_pc_master,
        pc_no: pcMaster.pc_no,
        pc_description: pcMaster.pc_description,
        unit: pcMaster.unit,
        category: pcMaster.category,
        status: pcMaster.status,
        pc_location: pcMaster.pc_location,
        note: pcMaster.note,
        date_registration: pcMaster.date_registration,
        date_expired: pcMaster.date_expired,
        pc_spectification: pcMaster.pc_spectification,
        post_username: pcMaster.post_username,
        post_date: pcMaster.post_date,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, [formValues.id_pc_master]);

  const options = dataPcMaster.map((stock, i) => (
    <option key={i} value={stock.id_pc_master}>
      {stock.pc_no}
    </option>
  ));
  return (
    <>
      <section className="w-full flex-col flex gap-9 ">
        {/* <Title>Halaman PC Master</Title> */}
        <section className="bg-slate-300 rounded-3xl w-full shadow-md  mt-4 ">
          {/* Menu */}
          <section className="table__header ">
            <Title>Data PC Master</Title>
            <div className="flex gap-2">
              <button
                className="button"
                onClick={() => {
                  setAddModal(true);
                }}
              >
                Tambah Pc Master
              </button>
              <button
                className="button"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteModal(true);
                }}
                className="button"
              >
                Delete
              </button>
            </div>
          </section>
          {/* Data */}
          <section className="gap-2 max-h-[216px] p-4 w-full justify-between   flex  flex-wrap  overflow-hidden overflow-y-auto">
            <div className="gap-2 flex flex-col w-60">
              <label className="min-w-[140px]">Pc Number</label>
              <div className="flex justify-end items-end gap-2">
                <select
                  className="w-full bg-gray-200 rounded-md shadow-sm h-8"
                  onChange={handleChange}
                  name="id_pc_master"
                >
                  {options}
                </select>
                <NavLink to={`detail`} className="detail_all_pc_master">
                  ...
                </NavLink>
              </div>
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label> PC Description</label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.pc_description}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label>Unit</label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.unit}
              />
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label>Category</label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.category}
              />
            </div>

            <div className="gap-2 flex flex-col w-60">
              <label>Pc Location</label>
              <input
                className=" bg-slate-200"
                type="text"
                readOnly
                value={formValues.pc_location}
              />
            </div>

            <div className="gap-2 flex flex-col w-60">
              <label>Status Barang</label>
              <div
                className="flex flex-wrap gap-2 items-center rounded-md h-9"
                readOnly
              >
                <input
                  type="radio"
                  name="status"
                  value="used"
                  checked={formValues.status === "used"}
                  className="border-2 border-slate-800 rounded-md p-2"
                />
                <label className="ml-2">used</label>
                <input
                  type="radio"
                  name="status"
                  value="new"
                  checked={formValues.status === "new"}
                  className="border-2 border-slate-800 rounded-md p-2"
                />
                <label className="ml-2">Baru</label>
                <input
                  type="radio"
                  name="status"
                  value="reused"
                  checked={formValues.status === "reused"}
                  className="border-2 border-slate-800 rounded-md p-2"
                />
                <label className="ml-2">Reused</label>
              </div>
            </div>

            <div className="gap-2 flex flex-col w-60">
              <label>Date Registration</label>
              <input
                className=" bg-slate-200"
                type="text"
                readOnly
                value={formValues.date_registration || "-"}
              />
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label>Date Expired</label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.date_expired || "-"}
                readOnly
              />
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label>Note</label>
              <textarea
                className="bg-slate-200 h-[120px]"
                value={formValues.note}
              />
            </div>

            <div className="gap-2 flex flex-col w-60">
              <label> PC Spectification</label>
              <input
                className=" bg-slate-200"
                type="text"
                readOnly
                value={formValues.pc_spectification}
              />
            </div>

            <div className="gap-2 flex flex-col w-60">
              <label>Created at: </label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.post_date.slice(0, 10)}
              />
            </div>
            <div className="gap-2 flex flex-col w-60">
              <label>Username Upload</label>
              <input
                className=" bg-slate-200"
                type="text"
                value={formValues.post_username}
              />
            </div>
          </section>
        </section>
        <DataComponentsPc
          dataPcComponent={dataPcComponent}
          formValues={formValues}
        />
      </section>
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalPcMaster
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={editModal} onClose={() => setEditModal(false)}>
        <FormEditModalPcMaster
          onClose={() => setEditModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormDeleteModalPcMaster
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

export default DataPc;
