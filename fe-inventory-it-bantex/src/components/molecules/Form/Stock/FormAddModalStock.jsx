import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataStock } from "../../../../config/ValidateForm";
import { CustomInput, CustomSelect } from "../../../atoms";
import { useDispatch } from "react-redux";
import { createStock } from "../../../../Redux/Feature/StockSlice";

const FormAddModalStock = ({ onClose, setIsLoading, category }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    stock_description: "",
    stock_qty: "",
    category: "",
    unit: "",
    type: "",
    note: "",
    post_user_id: idUser,
    post_username: username,
  });

  const [formErrors, setFormErrors] = useState({});
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const dispatch = useDispatch();

  const handleCreateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataStock(formValues);

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    dispatch(createStock(formValues))
      .then(() => {
        alert("Stock berhasil dibuat");
        onClose();
        setIsLoading(true);
      })
      .catch((error) => {
        alert("Error creating stock:", error);
      });
  };

  const Unit = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const Type = ["Hardware", "Software"];

  console.log(category);

  return (
    <form
      onSubmit={handleCreateForm}
      className=" max-h-[600px] bg-amber-300 grid grid-flow-dense grid-cols-3  p-4 rounded-xl  gap-3 overflow-y-auto"
    >
      <h1 className="text-2xl text-center col-span-3">Tambah Stock</h1>
      <hr className="border border-slate-800 w-2/5 m-auto col-span-3" />
      <CustomInput
        label="Nama Barang"
        type="text"
        name="stock_description"
        placeholder="Masukan Nama Barang"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Jumlah Barang"
        type="number"
        name="stock_qty"
        placeholder="Masukan Jumlah Barang"
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
      <div className="gap-2 flex flex-col w-60 row-span-2">
        <label>Note (if any)</label>
        <textarea
          className="bg-slate-200 h-[120px]"
          placeholder=""
          name="note"
          onChange={handleChangeValue}
        />
      </div>

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
        label="type Barang"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Type Barang
          </option>,
          ...Type.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          )),
        ]}
        name="type"
        onChange={handleChangeValue}
      />

      {formErrors.length > 0 && (
        <div>
          {formErrors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 self-end col-span-2 ">
        <button
          onClick={() => {
            onClose();
          }}
          className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white"
        >
          Kembali
        </button>
        <button className="flex-1 rounded-md bg-slate-800 text-white p-2">
          Tambah
        </button>
      </div>
    </form>
  );
};

export default FormAddModalStock;
