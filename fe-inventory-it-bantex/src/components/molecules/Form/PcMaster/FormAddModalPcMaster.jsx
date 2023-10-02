import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";

const FormAddModalPcMaster = ({ onClose, setIsLoading }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    brand: "",
    year: "",
    total: "",
    unit: "",
    _condition: "",
    _function: "",
    code_stock: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    name: formValues.name,
    brand: formValues.brand,
    year: formValues.year,
    total: formValues.total,
    unit: formValues.unit,
    _condition: formValues._condition,
    _function: formValues._function,
    code_stock: formValues.code_stock,
  };

  console.log(data);
  const handleCreateForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errors = validate(formValues);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0 && isSubmit) {
      AxiosInstance.post("/stocks", data)
        .then((res) => {
          console.log(res);
          onClose();
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.code_stock) {
      errors.code_stock = "code_stock is required!";
    }
    if (!values.brand) {
      errors.brand = "brand is required!";
    }
    if (!values.year) {
      errors.year = "Year is required!";
    }
    if (!values.total) {
      errors.total = "total is required!";
    }
    if (!values.unit) {
      errors.unit = "Unit is required!";
    }
    if (!values._condition) {
      errors._condition = "Condition is required!";
    }
    if (!values._function) {
      errors._function = "Berfungsi is required!";
    }

    return errors;
  };
  return (
    <form
      onSubmit={handleCreateForm}
      className="w-[450px] max-h-[600px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3 overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Tambah Pengguna Pc</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <div className="flex flex-col gap-1">
        <label>Kode Barang</label>
        <input
          type="text"
          name="code_stock"
          placeholder="Enter Your New Stock Code"
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.code_stock}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Nama Barang</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your New Stock Name"
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.name}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Merek Barang</label>
        <input
          type="text"
          name="brand"
          placeholder="Enter Your New Stock Brand"
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.brand}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Tahun Barang</label>
        <input
          type="text"
          name="year"
          placeholder="Enter Your New Stock Code"
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.year}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Jumlah Barang</label>
        <input
          type="number"
          name="total"
          placeholder="Enter Your New "
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.total}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Satuan Barang</label>
        <input
          type="text"
          name="unit"
          placeholder="Enter Your New Stock Code"
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
        <p className="text-center text-error-40">{formErrors.unit}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Kondisi Barang</label>
        <div className="flex flex-wrap gap-1">
          <input
            type="radio"
            name="_condition"
            value="Baru"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Baru</label>
          <input
            type="radio"
            name="_condition"
            value="Bekas"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Bekas</label>
        </div>
        <p className="text-center text-error-40">{formErrors._condition}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label>Berfungsi</label>
        <div className="flex flex-wrap gap-1">
          <input
            type="radio"
            name="_function"
            value="Iya"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Iya</label>
          <input
            type="radio"
            name="_function"
            value="Tidak"
            className="border-2 border-slate-800 rounded-md p-2"
            onChange={handleChangeValue}
          />
          <label className="ml-2">Tidak</label>
        </div>
        <p className="text-center text-error-40">{formErrors._function}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="flex-1 rounded-md bg-slate-800 text-white p-2">
          Add Stock
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white"
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default FormAddModalPcMaster;
