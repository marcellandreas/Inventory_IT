import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemById,
  updateItem,
} from "../../../../Redux/Feature/ItemsSlice";
import { CustomInput, CustomSelect } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";

const FormEditModalItem = ({ onClose, id, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const formValuesId = useSelector((state) => state.itemsSlice.dataById);

  useEffect(() => {
    if (formValuesId.length > 0) {
      const mappedItemData = {
        item_no: formValuesId[0].item_no,
        item_description: formValuesId[0].item_description,
        unit: formValuesId[0].unit,
        category: formValuesId[0].category,
        brand: formValuesId[0].brand,
        status: formValuesId[0].status,
        kondisi: formValuesId[0].kondisi,
        item_location: formValuesId[0].item_location,
        note: formValuesId[0].note,
        date_registration: formValuesId[0].date_registration,
        date_expired: formValuesId[0].date_expired,
        item_specification: formValuesId[0].item_specification,
      };
      setFormValues(mappedItemData);
    }
  }, [formValuesId]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [id, dispatch]);

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

  const [validation, setValidation] = useState([]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

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

  const handleUpdateForm = () => {
    const errors = validateFormDataItems(formValues);

    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    dispatch(updateItem({ id, data: data }))
      .unwrap()
      .then(() => {
        onClose();
        alert("berhasil Edit Data");
      });
  };
  const { unitOptions, categories } = useHelpersFormData();

  return (
    <form
      onSubmit={handleUpdateForm}
      className="bg-amber-400 px-4 py-2 max-h-[600px] rounded-xl overflow-y-auto grid grid-cols-3 gap-4 grid-flow-dense"
    >
      <h1 className="text-2xl font-semibold text-center row-span-1 col-span-3">
        Edit Barang
      </h1>
      <hr className="border border-slate-800 w-full m-auto col-span-3" />
      <CustomInput
        label="No Item"
        type="text"
        name="item_no"
        value={formValues.item_no}
        className="col-span-3 md:col-span-1"
        placeholder="Enter Your New Item Number"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Deskripsi Barang"
        type="text"
        name="item_description"
        className="col-span-3 md:col-span-1"
        value={formValues.item_description}
        placeholder="Enter Your New Item Description"
        onChange={handleChangeValue}
      />

      <CustomSelect
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
        className="col-span-3 md:col-span-1"
        name="unit"
        onChange={handleChangeValue}
        value={formValues.unit}
      />
      <CustomSelect
        label="Kategory"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Category
          </option>,
          ...categories.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          )),
        ]}
        className="col-span-3 md:col-span-1"
        value={formValues.category}
        name="category"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Merek Barang"
        type="text"
        name="brand"
        className="col-span-3 md:col-span-1"
        placeholder="Enter Your New Brand "
        value={formValues.brand}
        onChange={handleChangeValue}
      />

      <div className="gap-2 flex flex-col w-60 col-span-3 md:col-span-1">
        <label>Status Barang</label>
        <div className="flex flex-wrap gap-1">
          <input
            type="radio"
            name="status"
            value="used"
            checked={formValues.status === "used"}
            onChange={handleChangeValue}
          />
          <label className="ml-2">used</label>
          <input
            type="radio"
            name="status"
            value="new"
            checked={formValues.status === "new"}
            onChange={handleChangeValue}
          />
          <label className="ml-2">Baru</label>
          <input
            type="radio"
            name="status"
            value="reused"
            checked={formValues.status === "reused"}
            onChange={handleChangeValue}
          />
          <label className="ml-2">Reused</label>
        </div>
      </div>
      <div className="gap-2 flex flex-col w-60 col-span-3 md:col-span-1">
        <label>Kondisi Barang</label>
        <div className="flex flex-wrap gap-1">
          <input
            type="radio"
            name="kondisi"
            value="Good"
            checked={formValues.kondisi === "Good"}
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Good</label>
          <input
            type="radio"
            name="kondisi"
            value="Normal"
            checked={formValues.kondisi === "Normal"}
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Normal</label>
          <input
            type="radio"
            name="kondisi"
            value="Bad"
            checked={formValues.kondisi === "Bad"}
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
        className="col-span-3 md:col-span-1"
        placeholder="Enter Your New Item Location"
        value={formValues.item_location}
        onChange={handleChangeValue}
      />
      <div className="gap-2 flex flex-col w-60 row-span-2 col-span-3 md:col-span-1">
        <label>Note (if any)</label>
        <textarea
          className="bg-slate-200 h-[120px]"
          placeholder=""
          value={formValues.note}
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <CustomInput
        label="Date Registasi"
        name="date_registation"
        placeholder="Enter Your date"
        onChange={handleChangeValue}
        value={formValues.date_registation}
        type="date"
        className="col-span-3 md:col-span-1"
      />
      <CustomInput
        label="Date Expired (jika tidak terpakai)"
        name="date_expired"
        value={formValues.date_expired}
        placeholder="Enter Your New date "
        className="col-span-3 md:col-span-1"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Item Spesifikasi"
        type="text"
        name="item_specification"
        className="col-span-3 md:col-span-1"
        placeholder="Enter Your New item specification "
        value={formValues.item_specification}
        onChange={handleChangeValue}
      />

      {validation.length > 0 && (
        <div>
          {validation.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 w-full row-span-1 h-10 col-span-3 md:col-span-2 self-end">
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

export default FormEditModalItem;
