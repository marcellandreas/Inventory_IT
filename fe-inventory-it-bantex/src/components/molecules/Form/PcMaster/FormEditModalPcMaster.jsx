import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import Title from "../../../atoms/Text/Title";

const FormEditModalPcMaster = ({ onClose, id, setIsLoading }) => {
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

  useEffect(() => {
    AxiosInstance.get(`pcmaster/${id}`).then((res) => {
      const itemData = res.data.data;
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
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

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
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataPcMaster(formValues);
    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    AxiosInstance.patch(`/pcmaster/${id}`, data)
      .then((res) => {
        onClose();
        setIsLoading(true);
        alert("berhasil");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Edit PC Master</Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form onSubmit={handleUpdateForm} className="flex justify-between">
        <div>
          <div className="gap-2 flex flex-col w-60">
            <label>Pc Number</label>
            <input
              className=" bg-slate-200 uppercase"
              placeholder="e.g: IT-PC-0001"
              type="text"
              name="pc_no"
              onChange={handleChangeValue}
              value={formValues.pc_no}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Pc Description</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g: "
              name="pc_description"
              type="text"
              onChange={handleChangeValue}
              value={formValues.pc_description}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Unit</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g: Pcs, Liter, Meter"
              name="unit"
              type="text"
              onChange={handleChangeValue}
              value={formValues.unit}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Category</label>
            <input
              className=" bg-slate-200 uppercase"
              placeholder="e.g: PC or LAPTOP"
              type="text"
              onChange={handleChangeValue}
              value={formValues.category}
            />
          </div>

          <div className="gap-2 flex flex-col w-60">
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

          <div className="gap-2 flex flex-col w-60">
            <label>Pc Location</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g: "
              type="text"
              name="pc_location"
              onChange={handleChangeValue}
              value={formValues.pc_location}
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
              value={formValues.note}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Registration</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="text"
              name="date_registration"
              onChange={handleChangeValue}
              value={formValues.date_registation.slice(0, 10)}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date Expired</label>
            <input
              className=" bg-slate-200 "
              placeholder=""
              type="text"
              name="date_expired"
              onChange={handleChangeValue}
              value={
                formValues.date_expired == null ? "-" : formValues.date_expired
              }
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

export default FormEditModalPcMaster;
