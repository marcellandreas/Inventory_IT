import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import getUserData from "../../../../utils/GetUserData";
import { useDispatch } from "react-redux";
import { createItem, fetchItems } from "../../../../Redux/Feature/ItemsSlice";
import { CustomInput, CustomSelect, CustomTextArea } from "../../../atoms";

const FormAddModalItem = ({ onClose, setIsLoading }) => {
  // const idUser = localStorage.getItem("id_user");
  // const username = localStorage.getItem("username");
  const [validation, setValidation] = useState([]);

  const [formValues, setFormValues] = useState({
    item_no: "",
    item_description: "",
    unit: "",
    category: "",
    brand: "",
    status: "",
    kondisi: "",
    item_location: "",
    note: "",
    date_registation: "",
    date_expired: "",
    item_specification: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { idUser, username } = getUserData();
  const dispatch = useDispatch();

  const data = {
    item_no: formValues.item_no,
    item_description: formValues.item_description,
    unit: formValues.unit,
    category: formValues.category,
    brand: formValues.brand,
    status: formValues.status,
    kondisi: formValues.kondisi,
    item_location: formValues.item_location,
    note: formValues.note,
    date_registation: formValues.date_registation,
    date_expired: formValues.date_expired,
    item_specification: formValues.item_specification,
    post_user_id: idUser,
    post_username: username,
  };

  const handleCreateForm = async () => {
    const errors = validateFormDataItems(formValues);

    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    dispatch(createItem(data))
      .unwrap()
      .then(() => {
        onClose();
      });
  };

  const Unit = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const category = ["HDD", "SDD"];

  return (
    <form
      onSubmit={handleCreateForm}
      className="  bg-amber-400 px-4 py-2 max-h-[600px] rounded-xl overflow-y-auto grid grid-cols-3 gap-4 grid-flow-dense "
    >
      <h1 className="text-2xl font-semibold text-center row-span-1 col-span-3">
        Tambah Barang{" "}
      </h1>
      <hr className="border border-slate-800 w-full m-auto col-span-3" />
      <CustomInput
        label="No Item"
        type="text"
        name="item_no"
        placeholder="Enter Your New Item Number"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Deskripsi Barang"
        type="text"
        name="item_description"
        placeholder="Enter Your New Item Description"
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

      <CustomInput
        label="Merek Barang"
        type="text"
        name="brand"
        placeholder="Enter Your New Brand "
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
        <label>Kondisi Barang</label>
        <div className="flex flex-wrap gap-1">
          <input
            type="radio"
            name="kondisi"
            value="Good"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Good</label>
          <input
            type="radio"
            name="kondisi"
            value="Normal"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Normal</label>
          <input
            type="radio"
            name="kondisi"
            value="Bad"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Bad</label>
        </div>
      </div>
      <CustomInput
        label="Lokasi Barang"
        type="text"
        name="item_location"
        placeholder="Enter Your New Item Location"
        onChange={handleChangeValue}
      />

      <div className="gap-2 flex flex-col w-60 row-span-2">
        <label>Note (if any)</label>
        <textarea
          className="bg-slate-200 h-[120px]"
          placeholder=""
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <CustomInput
        label="Date Registasi"
        name="date_registation"
        placeholder="Enter Your date"
        onChange={handleChangeValue}
        type="date"
      />
      <CustomInput
        label="Date Expired (jika tidak terpakai)"
        name="date_expired"
        placeholder="Enter Your New date "
        className="p-1 rounded-md"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Item Spesifikasi"
        type="text"
        name="item_specification"
        placeholder="Enter Your New item specification "
        onChange={handleChangeValue}
      />

      {validation.length > 0 && (
        <div>
          {validation.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 w-full row-span-1 h-10 col-span-2 self-end">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button className="button flex-1">Simpan</button>
      </div>
    </form>
  );
};

export default FormAddModalItem;
