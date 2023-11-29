import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../apis/api";
import {
  FormAddModalPcMaster,
  FormDeleteModalPcMaster,
  FormEditModalPcMaster,
} from "../../molecules";
import { NavLink } from "react-router-dom";
import DataComponentsPc from "./DataComponentsPc";
import {
  MdEditNote,
  BsDatabaseFillAdd,
  MdDelete,
} from "../../../assets/icons/icons";
import Loading from "../../molecules/Loading";
import {
  CustomInput2,
  CustomRadioGroup,
  CustomTextArea2,
  H5,
  TitleTable,
} from "../../atoms";
import { TableHeader, ShowModal } from "../../organisms";
import { showFormattedDate, Modals } from "../../../helpers";

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
    <option key={formValues.id_pc_master} value={formValues.pc_no || null}>
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
              <TitleTable count={dataPcMaster.length}>
                Data Master Komputer
              </TitleTable>
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
            {dataPcMaster == 0 ? (
              <section className=" min-h-[30vh] flex justify-center items-center font-normal">
                <H5>Tidak ada Pc Master</H5>
              </section>
            ) : (
              <section className="grid  grid-flow-dense gap-2  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 max-h-[216px] overflow-hidden overflow-y-auto">
                <div className="gap-2 flex flex-col w-full">
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
                <CustomInput2
                  label="Deskripsi"
                  value={formValues.pc_description}
                  readOnly={true}
                />
                <CustomInput2
                  label="Satuan"
                  value={formValues.unit}
                  readOnly={true}
                />
                <CustomInput2
                  label="Kategori"
                  value={formValues.category}
                  readOnly={true}
                />
                <CustomInput2
                  label="Lokasi Pc"
                  value={formValues.pc_location}
                  readOnly={true}
                />
                <CustomInput2
                  label="Lokasi Pc"
                  value={formValues.pc_location}
                  readOnly={true}
                />
                <CustomRadioGroup
                  label="status"
                  options={[
                    { value: "used", label: "used" },
                    { value: "new", label: "Baru" },
                    { value: "reused", label: "Reused" },
                  ]}
                  value={formValues.status}
                />
                <CustomInput2
                  label="Tanggal Registrasi"
                  value={formValues.date_registration || "-"}
                  readOnly={true}
                />
                <CustomInput2
                  label="Tanggal Exp (Rusak)"
                  value={`${
                    showFormattedDate(formValues.date_expired) || "-"
                  } `}
                  readOnly={true}
                />
                <CustomTextArea2
                  label="Catatan (jika ada)"
                  value={formValues.note}
                  readOnly
                />
                <CustomInput2
                  label="Spesifikasi"
                  value={formValues.pc_spectification}
                  readOnly={true}
                />
                <CustomInput2
                  label="Created at:"
                  value={`${showFormattedDate(formValues.post_date)}`}
                  readOnly={true}
                />
                <CustomInput2
                  label="Created at:"
                  value={formValues.post_username}
                  readOnly={true}
                />
              </section>
            )}
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
