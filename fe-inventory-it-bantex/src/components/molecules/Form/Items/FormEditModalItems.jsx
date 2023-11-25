import { useEffect, useState } from "react";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import { useDispatch } from "react-redux";
import { fetchItems, updateItem } from "../../../../Redux/Feature/ItemsSlice";
import { CustomInput, CustomInput2 } from "../../../atoms";
import { useFetchItemById } from "../../../../config/GetData";

const FormEditModalItem = ({ onClose, id }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const dataItemById = useFetchItemById(id);
  const dispatch = useDispatch();
  useEffect(() => {
    setFormValues({
      item_no: dataItemById.item_no,
      item_description: dataItemById.item_description,
      unit: dataItemById.unit,
      category: dataItemById.category,
      brand: dataItemById.brand,
      status: dataItemById.status,
      kondisi: dataItemById.kondisi,
      item_location: dataItemById.item_location,
      note: dataItemById.note,
      date_registation: dataItemById.date_registation,
      date_expired: dataItemById.date_expired,
      item_specification: dataItemById.item_specification,
    });
  }, [id, dataItemById]);
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

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataItems(formValues);

    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    dispatch(updateItem({ id, data: data }))
      .unwrap()
      .then(() => {
        onClose();
        dispatch(fetchItems());
        alert("berhasil Edit Data");
      });
  };

  return (
    <form
      onSubmit={handleUpdateForm}
      className="bg-amber-400 px-4 py-2 max-h-[600px] rounded-xl overflow-y-auto"
    >
      <h1 className="text-2xl font-semibold text-center">Edit Barang</h1>
      <hr className="border border-slate-800 w-full m-auto col-span-3" />
      <div className="col-span-3 flex flex-col gap-2">
        <h1>
          Default Value <span className=" text-red-700">*</span>
        </h1>
        <div className=" grid grid-flow-dense grid-cols-6 ">
          <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2">
            <label>Items Nomer</label>
            <input
              className=" bg-slate-200 uppercase"
              readOnly
              value={formValues.item_no}
            />
          </div>

          <CustomInput2
            label="Deskripsi Barang"
            readOnly={true}
            className="col-span-6 sm:col-span-3 md:col-span-2"
            value={formValues.item_description}
          />
        </div>
      </div>

      <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2">
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
      <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2">
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
        className="col-span-6 sm:col-span-3 md:col-span-2"
        placeholder="Enter Your New Item Location"
        value={formValues.item_location}
        onChange={handleChangeValue}
      />
      <div className="gap-2 flex flex-col  col-span-6 sm:col-span-3 md:col-span-2">
        <label>Catatan (jika ada)</label>
        <textarea
          className="bg-slate-200 h-[120px]"
          placeholder=""
          value={formValues.note}
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <CustomInput
        label="Tanggal Registrasi"
        name="date_registation"
        placeholder="Enter Your date"
        onChange={handleChangeValue}
        value={formValues.date_registation}
        type="date"
        className="col-span-6 sm:col-span-3 md:col-span-2"
      />
      <CustomInput
        label="Date Expired (jika tidak terpakai)"
        name="date_expired"
        type="date"
        value={formValues.date_expired}
        placeholder="Enter Your New date "
        className="col-span-6 sm:col-span-3 md:col-span-2"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Item Spesifikasi"
        type="text"
        name="item_specification"
        className="col-span-6 sm:col-span-3 md:col-span-2"
        placeholder="Enter Your New item specification "
        value={formValues.item_specification}
        onChange={handleChangeValue}
      />

      <div className="col-span-3 flex flex-col gap-2">
        <h1>
          info lainnya (dari stock) <span className=" text-red-700">*</span>
        </h1>
        <div className="col-span-3 grid grid-flow-dense grid-cols-3 ">
          <CustomInput
            label="Satuan"
            className="col-span-3 md:col-span-1"
            value={formValues.unit}
            readOnly={true}
          />
          <CustomInput
            label="Kategori"
            className="col-span-3 md:col-span-1"
            value={formValues.category}
            readOnly={true}
          />
          <CustomInput
            label="Merek"
            className="col-span-3 md:col-span-1"
            value={formValues.brand}
            readOnly={true}
          />
        </div>
      </div>

      {validation.length > 0 && (
        <div>
          {validation.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
      <div className="col-span-3 grid grid-flow-dense grid-cols-3">
        <div className="gap-2 w-full row-span-1 h-10 col-span-3 flex place-self-end   ">
          <button
            onClick={() => {
              onClose();
            }}
            className="button_2 flex-1 "
          >
            Kembali
          </button>
          <button className="button flex-1 ">Simpan</button>
        </div>
      </div>
    </form>
  );
};

export default FormEditModalItem;
