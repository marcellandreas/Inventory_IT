import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import { Title, CustomInput2, CustomSelect2 } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";

const FormEditModalPcMaster = ({ onClose, id, pcno, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const { unitOptions, CategoriesPcMaster } = useHelpersFormData();

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
    post_user_id: "",
    post_username: "",
  });

  useEffect(() => {
    AxiosInstance.get(`pcmaster/${pcno}`).then((res) => {
      const itemData = res.data.data;
      console.log(itemData);
      const mappedItemData = itemData.map((item) => ({
        pc_no: item.pc_no,
        pc_description: item.pc_description,
        unit: item.unit,
        category: item.category,
        status: item.status,
        pc_location: item.pc_location,
        note: item.note,
        date_registation: item.date_registation,
        date_expired: item.date_expired,
        pc_spectification: item.pc_spectification,
        post_user_id: item.post_user_id,
        post_username: item.post_username,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataPcMaster(formValues);
    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    AxiosInstance.patch(`/pcmaster/${id}`, formValues)
      .then((res) => {
        alert(res.data.message);
        console.log(formValues);
        setIsLoading(true);
        onClose();
      })
      .catch((err) => {
        alert("Gagal Edit Pc Master");
        console.log(err);
      });
  };
  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col  gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Edit PC Master</Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form
        onSubmit={handleUpdateForm}
        className=" grid grid-flow-dense gap-3 grid-cols-2"
      >
        <div className="gap-2 flex flex-col ">
          <label>Pc Number</label>
          <input
            className=" bg-slate-200 uppercase"
            readOnly
            value={formValues.pc_no}
          />
        </div>
        <CustomInput2
          label="Deskripsi PC"
          name="pc_description"
          type="text"
          onChange={handleChangeValue}
          value={formValues.pc_description}
        />

        <CustomSelect2
          label="Unit"
          options={[
            <option key="default" value={formValues.unit} selected>
              {formValues.unit}
            </option>,
            ...unitOptions.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            )),
          ]}
          // className="col-span-3 md:col-span-1"
          name="unit"
          onChange={handleChangeValue}
        />
        <CustomSelect2
          label="Kategori"
          options={[
            <option key="default" value={formValues.category} selected>
              {formValues.category}
            </option>,
            ...CategoriesPcMaster.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            )),
          ]}
          // className="col-span-3 md:col-span-1"
          name="category"
          onChange={handleChangeValue}
        />

        <div className="gap-2 flex flex-col ">
          <label>Status Barang</label>
          <div className="flex flex-wrap gap-1">
            <input
              type="radio"
              name="status"
              value="used"
              checked={formValues.status === "used"}
              className="border-2 border-slate-800 rounded-md p-2"
              onChange={handleChangeValue}
            />
            <label className="ml-2">used</label>
            <input
              type="radio"
              name="status"
              value="new"
              checked={formValues.status === "new"}
              className="border-2 border-slate-800 rounded-md p-2"
              onChange={handleChangeValue}
            />
            <label className="ml-2">Baru</label>
            <input
              type="radio"
              name="status"
              value="reused"
              checked={formValues.status === "reused"}
              className="border-2 border-slate-800 rounded-md p-2"
              onChange={handleChangeValue}
            />
            <label className="ml-2">Reused</label>
          </div>
        </div>

        <CustomInput2
          label="Lokasi PC"
          placeholder="e.g: "
          type="text"
          name="pc_location"
          onChange={handleChangeValue}
          value={formValues.pc_location}
        />
        <div className="gap-2 flex flex-col row-span-2 ">
          <label>Note (if any)</label>
          <textarea
            className="bg-slate-200 h-[98px]"
            placeholder=""
            name="note"
            onChange={handleChangeValue}
            value={formValues.note}
          />
        </div>

        <CustomInput2
          label="Tanggal Registrasi"
          type="date"
          name="date_registration"
          onChange={handleChangeValue}
          value={formValues.date_registation}
        />
        <CustomInput2
          label="Tanggal Kadaluarsa"
          type="date"
          name="date_expired"
          onChange={handleChangeValue}
          value={
            formValues.date_expired == null ? "-" : formValues.date_expired
          }
        />
        <div className="flex flex-wrap gap-2 col-span-2">
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

export default FormEditModalPcMaster;
