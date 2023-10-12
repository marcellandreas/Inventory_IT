import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import Title from "../../../atoms/Text/Title";

const FormAddApplications = ({ onClose, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    name_pt: "",
    name_division: "",
    goods_req_date: "",
    qty: "",
    note: "",
    items_description: "",
    items_no: "",
    approved_1: "",
    approved_2: "",
    post_username: "",
    post_user_id: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    pc_no: formValues.pc_no,
    pc_description: formValues.pc_description,
    unit: formValues.unit,
    category: formValues.category,
    status: formValues.status,
    pc_location: formValues.pc_location,
    note: formValues.note,
    date_registation: formValues.date_registation,
    date_expired: formValues.date_expired,
    pc_spectification: formValues.pc_spectification,
    post_user_id: idUser,
    post_username: username,
  };

  console.table(formValues, "dah");

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const errors = validateFormDataPcMaster(formValues);

    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      alert(errors);
      return;
    }

    await AxiosInstance.post("/pcmaster", data)
      .then((res) => {
        console.log(res);
        onClose();
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Tambahkan Data Pengajuan</Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form onSubmit={handleCreateForm} className="flex justify-between">
        <div>
          <div className="gap-2 flex flex-col w-60">
            <label>Nama PT.</label>
            <input
              className=" bg-slate-200 uppercase"
              placeholder="e.g: IT-PC-0001"
              type="text"
              name="name_pt"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Nama Bagian / Divisi</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g: "
              name="name_division"
              type="text"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>QTY</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g:"
              name="qty"
              type="text"
              //   onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="gap-2 flex flex-col w-60">
            <label>Note (if any)</label>
            <textarea
              className="bg-slate-200 h-[98px]"
              placeholder=""
              name="note"
              //   onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Registration</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="date"
              name="date_registation"
              //   onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Expired</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="date"
              name="date_expired"
              //   onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>PC Spec</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="text"
              name="pc_spectification"
              //   onChange={handleChangeValue}
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-12">
            <button className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white">
              Kembali
            </button>
            <button className="flex-1 rounded-md bg-slate-800 text-white p-2">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormAddApplications;
