import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemById,
  updateItem,
} from "../../../../Redux/Feature/ItemsSlice";

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
    kondisi: "",
    status: "",
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

  return (
    <form
      onSubmit={handleUpdateForm}
      className="form_modal max-h-[600px] overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Edit Barang</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <div className="content_input">
        <label>Item Number</label>
        <input
          type="text"
          name="item_no"
          value={formValues.item_no}
          placeholder="Enter Your New Item Number"
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Item Description</label>
        <input
          type="text"
          name="item_description"
          placeholder="Enter Your New Items Description"
          value={formValues.item_description}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Unit</label>
        <input
          type="text"
          name="unit"
          placeholder="Enter Your Unit Pcs, Meter, Ml"
          value={formValues.unit}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter Your Category HDD, Memory RAM "
          value={formValues.category}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          placeholder="Enter Your New Brand "
          value={formValues.brand}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
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
      <div className="content_input">
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
      <div className="content_input">
        <label>Item Location</label>
        <input
          type="text"
          name="item_location"
          placeholder="Enter Your New Note"
          value={formValues.item_location}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Note</label>
        <input
          type="text"
          name="note"
          placeholder="Enter Your New Note"
          value={formValues.note}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Date Registation</label>
        <input
          type="date"
          name="date_registation"
          placeholder="Enter Your date"
          value={formValues.date_registation}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Date Expired</label>
        <input
          type="date"
          name="date_expired"
          placeholder="Enter Your New date "
          value={formValues.date_expired}
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Item Specification</label>
        <input
          type="text"
          name="item_specification"
          placeholder="Enter Your New item specification "
          value={formValues.item_specification}
          onChange={handleChangeValue}
        />
      </div>
      {validation.length > 0 && (
        <div>
          {validation.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 w-full">
        <button className="button flex-1">Simpan</button>
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
      </div>
    </form>
  );
};

export default FormEditModalItem;
