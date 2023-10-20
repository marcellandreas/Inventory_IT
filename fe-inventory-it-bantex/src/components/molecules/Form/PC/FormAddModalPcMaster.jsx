import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import Title from "../../../atoms/Text/Title";
import { CustomInput, CustomSelect } from "../../../atoms";

const FormAddModalPcMaster = ({ onClose, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    pc_no: "",
    pc_description: "",
    unit: "",
    category: "",
    status: "",
    pc_location: "",
    note: "",
    date_registation: "",
    date_expired: "",
    pc_spectification: "",
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

  const Unit = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const category = ["PC", "LAPTOP"];

  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Tambah PC Master</Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form onSubmit={handleCreateForm} className="flex justify-between">
        <div>
          <CustomInput
            label="Pc Number"
            placeholder="e.g: IT-PC-0001"
            name="pc_no"
            type="text"
            onChange={handleChangeValue}
          />
          <CustomInput
            label="Pc Description"
            placeholder="e.g:"
            name="pc_description"
            type="text"
            onChange={handleChangeValue}
          />
          <CustomSelect
            label="Unit"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Unit Satuan
              </option>,
              ...Unit.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              )),
            ]}
            name="unit"
            onChange={handleChangeValue}
          />
          <CustomSelect
            label="Kategory"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Category
              </option>,
              ...category.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              )),
            ]}
            name="category"
            onChange={handleChangeValue}
          />

          <div className="gap-2 flex flex-col w-60">
            <label>Status Barang</label>
            <div className="flex flex-wrap gap-1">
              <input
                type="radio"
                name="status"
                value="used"
                className="border-2 border-slate-800 rounded-md p-2"
                onChange={handleChangeValue}
              />
              <label className="ml-2">used</label>
              <input
                type="radio"
                name="status"
                value="new"
                className="border-2 border-slate-800 rounded-md p-2"
                onChange={handleChangeValue}
              />
              <label className="ml-2">Baru</label>
              <input
                type="radio"
                name="status"
                value="reused"
                className="border-2 border-slate-800 rounded-md p-2"
                onChange={handleChangeValue}
              />
              <label className="ml-2">Reused</label>
            </div>
          </div>

          <div className="gap-2 flex flex-col w-60">
            <label>Pc Location</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g: "
              type="text"
              name="pc_location"
              onChange={handleChangeValue}
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
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Registration</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="date"
              name="date_registation"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Expired</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="date"
              name="date_expired"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>PC Spec</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="text"
              name="pc_spectification"
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-12">
            <button
              onClick={() => {
                onClose();
              }}
              className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white"
            >
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

export default FormAddModalPcMaster;
