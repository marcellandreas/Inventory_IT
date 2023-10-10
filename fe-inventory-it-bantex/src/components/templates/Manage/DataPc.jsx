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
import {
  MdEditNote,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";

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
        <p>Loading...</p>
      ) : (
        <section className="w-full flex-col flex gap-9 ">
          {/* <Title>Halaman PC Master</Title> */}
          <section className="bg-slate-300 rounded-3xl w-full shadow-md  mt-4 ">
            {/* Menu */}
            <section className="table__header ">
              <Title>Data PC Master</Title>
              <div className="flex gap-2">
                <button className="button" onClick={() => setAddModal(true)}>
                  <BsDatabaseFillAdd />
                </button>
                <button className="button" onClick={() => setEditModal(true)}>
                  <MdEditNote />
                </button>
                <button onClick={() => setDeleteModal(true)} className="button">
                  <MdDelete />
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
                <label> PC Description</label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  defaultValue={formValues.pc_description}
                  readOnly
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Unit</label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  defaultValue={formValues.unit}
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
                  defaultValue={formValues.pc_location}
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
                <label>Date Registration</label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  readOnly
                  defaultValue={formValues.date_registration || "-"}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Date Expired</label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  defaultValue={formValues.date_expired || "-"}
                  readOnly
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Note</label>
                <textarea
                  className="bg-slate-200 h-[120px]"
                  defaultValue={formValues.note}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label> PC Spectification</label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  readOnly
                  defaultValue={formValues.pc_spectification}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Created at: </label>
                <input
                  className=" bg-slate-200"
                  type="text"
                  defaultValue={formValues.post_date.slice(0, 10)}
                />
              </div>
              <div className="gap-2 flex flex-col w-60">
                <label>Username Upload</label>
                <input
                  className=" bg-slate-200"
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
          pcno={pcno}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormDeleteModalPcMaster
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          id={id}
          pcno={pcno}
        />
      </ShowModal>
    </>
  );
};

export default DataPc;
