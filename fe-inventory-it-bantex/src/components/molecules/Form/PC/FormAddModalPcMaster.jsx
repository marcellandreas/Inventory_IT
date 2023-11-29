import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import { CustomInput2, CustomSelect2, Title } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";

const FormAddModalPcMaster = ({ onClose, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
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
    pc_description: formValues.pc_description,
    unit: formValues.unit,
    category: formValues.category,
    status: formValues.status,
    pc_location: formValues.pc_location,
    note: formValues.note,
    date_registation: formValues.date_registation,
    date_expired: formValues.date_expired,
    pc_spectification: formValues.pc_spectification,
    post_user_id: Number(idUser),
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

  const { unitOptions, CategoriesPcMaster } = useHelpersFormData();

  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Tambah PC Master</Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form
        onSubmit={handleCreateForm}
        className="grid grid-flow-dense gap-3 grid-cols-1 sm:grid-cols-2"
      >
        <CustomInput2
          label="Deskripsi PC"
          placeholder="e.g: PC-RUANG IT-user"
          name="pc_description"
          type="text"
          onChange={handleChangeValue}
        />
        <CustomSelect2
          label="Unit"
          options={[
            <option key="default" value="" disabled selected>
              Pilih Unit Satuan
            </option>,
            ...unitOptions.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            )),
          ]}
          name="unit"
          onChange={handleChangeValue}
        />
        <CustomSelect2
          label="Kategory"
          options={[
            <option key="default" value="" disabled selected>
              Pilih Kategory
            </option>,
            ...CategoriesPcMaster.map((pc, index) => (
              <option key={index} value={pc}>
                {pc}
              </option>
            )),
          ]}
          name="category"
          onChange={handleChangeValue}
        />

        <div className="gap-2 flex flex-col ">
          <label>Status PC</label>
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

        <div className="gap-2 flex flex-col">
          <label>Lokasi Pc</label>
          <input
            className=" bg-slate-200 "
            placeholder="e.g: Ruang IT"
            type="text"
            name="pc_location"
            onChange={handleChangeValue}
          />
        </div>
        <div className="gap-2 flex flex-col row-span-2">
          <label>Catatan (jika ada)</label>
          <textarea
            className="bg-slate-200 h-[98px]"
            placeholder=""
            name="note"
            onChange={handleChangeValue}
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <label>Tanggal Registrasi</label>
          <input
            className=" bg-slate-200 "
            placeholder=""
            type="date"
            name="date_registation"
            onChange={handleChangeValue}
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <label>Tanggal kadaluarsa</label>
          <input
            className=" bg-slate-200 "
            placeholder=""
            type="date"
            name="date_expired"
            onChange={handleChangeValue}
          />
        </div>
        <div className="gap-2 flex flex-col ">
          <label>Spefifikasi PC</label>
          <input
            className=" bg-slate-200 "
            placeholder="eg: Spesifikasi "
            type="text"
            name="pc_spectification"
            onChange={handleChangeValue}
          />
        </div>
        <div className="flex flex-wrap gap-2 col-span-2 ">
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
      </form>
    </section>
  );
};

export default FormAddModalPcMaster;
