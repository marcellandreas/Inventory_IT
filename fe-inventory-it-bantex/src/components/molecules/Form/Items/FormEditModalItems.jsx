import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataItems } from "../../../../config/ValidateForm";

const FormEditModalItem = ({ onClose, id, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
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

  useEffect(() => {
    AxiosInstance.get(`items/${id}`).then((res) => {
      const itemData = res.data.data;
      const mappedItemData = itemData.map((item) => ({
        item_no: item.item_no,
        item_description: item.item_description,
        unit: item.unit,
        category: item.category,
        brand: item.brand,
        status: item.status,
        kondisi: item.kondisi,
        item_location: item.item_location,
        note: item.note,
        date_registration: item.date_registration,
        date_expired: item.date_expired,
        item_specification: item.item_specification,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

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
    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    AxiosInstance.patch(`/items/${id}`, data)
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
