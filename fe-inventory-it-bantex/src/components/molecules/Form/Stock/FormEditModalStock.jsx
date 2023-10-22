import { useEffect, useState } from "react";
import { CustomInput, CustomSelect } from "../../../atoms";
import { AxiosInstance } from "../../../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStockById,
  updateStock,
} from "../../../../Redux/Feature/StockSlice";
import { validateFormDataStock } from "../../../../config/ValidateForm";

const FormEditModalStock = ({ onClose, category, id }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();

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
  const Unit = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const Type = ["Hardware", "Software"];
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(category);

  const dataStockById = useSelector((state) => state.stocks.dataStockById);
  useEffect(() => {
    dispatch(fetchStockById(id))
      .then(() => {
        console.log("Data stock by ID berhasil diambil");
      })
      .catch((err) => {
        console.error("Error fetching stock by ID:", err);
      });
  }, [dispatch, id]);
  useEffect(() => {
    // Reset formValues when dataStockById changes
    if (dataStockById) {
      setFormValues({
        stock_description: dataStockById.stock_description,
        stock_qty: dataStockById.stock_qty,
        category: dataStockById.category,
        unit: dataStockById.unit,
        type: dataStockById.type,
        note: dataStockById.note,
        post_user_id: idUser,
        post_username: username,
      });
    }
  }, [dataStockById, id]);
  const [formErrors, setFormErrors] = useState({});

  const handleUpdateForm = async () => {
    const errors = validateFormDataStock(formValues);

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(updateStock({ id, formValues }));
      onClose();
      alert("Berhasil Mengubah Stock");
      setIsLoading(true);
    } catch (error) {
      // alert("Gagal Mengubah Stock");
      console.log(error);
    }
  };

  console.log(dataStockById);

  return (
    <form
      onSubmit={handleUpdateForm}
      className=" max-h-[600px] bg-amber-300 grid grid-flow-dense grid-cols-3  p-4 rounded-xl  gap-3 overflow-y-auto"
    >
      <h1 className="text-2xl text-center col-span-3">Edit Stock</h1>
      <hr className="border border-slate-800 w-2/5 m-auto col-span-3" />
      <CustomInput
        label="Nama Barang"
        type="text"
        name="stock_description"
        value={formValues.stock_description}
        placeholder="Masukan Nama Barang"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Jumlah Barang"
        type="number"
        name="stock_qty"
        placeholder="Masukan Jumlah Barang"
        value={formValues.stock_qty}
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
        value={formValues.category}
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
          value={formValues.note}
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
        value={formValues.unit}
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
        value={formValues.type}
        name="type"
        onChange={handleChangeValue}
      />

      {/* {formErrors.length > 0 && (
        <div>
          {formErrors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )} */}

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

export default FormEditModalStock;
