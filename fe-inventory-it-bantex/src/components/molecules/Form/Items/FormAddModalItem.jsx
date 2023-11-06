import { useEffect, useState } from "react";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import { useDispatch } from "react-redux";
import { createItem } from "../../../../Redux/Feature/ItemsSlice";
import { CustomInput, CustomSelect } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";
import { useFetchStocks } from "../../../../config/GetData";
import { AxiosInstance } from "../../../../apis/api";
import { updateStockQty } from "../../../../Redux/Feature/StockSlice";
import getUserData from "../../../../utils/GetUserData";

const FormAddModalItem = ({ onClose }) => {
  // get id and username
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  // const { idUser, username } = getUserData();
  const postLoginData = {
    post_user_id: idUser,
    post_username: username,
  };
  // validation
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const dataStock = useFetchStocks();
  const [formValues, setFormValues] = useState({
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

  // metode mencocokan category dan mengubah nya menjadi stock_no
  const [matchingStocks, setMatchingStocks] = useState([]);

  useEffect(() => {
    if (dataStock) {
      // Find and collect stock_no data for matching categories
      const matchingStockData = dataStock.filter(
        (data) => data.category === formValues.category
      );

      // Extract stock_no values from the matching data
      const matchingStockNos = matchingStockData.map((data) => data.stock_no);

      // Filter out undefined or null values
      const validStockNos = matchingStockNos.filter(
        (stockNo) => stockNo !== undefined && stockNo !== null
      );

      setMatchingStocks(validStockNos);
    }
  }, [dataStock, formValues.category]);

  if (matchingStocks.length > 0) {
    console.log("Category matches, stock_no values:", matchingStocks);
  } else {
    console.log("Category does not match");
  }

  const createItemAndUnwrap = async () => {
    const data = {
      ...formValues,
      ...postLoginData,
    };
    return await dispatch(createItem(data)).unwrap();
  };

  const createItemAndPostDetails = async () => {
    const createItemResponse = await createItemAndUnwrap();
    if (createItemResponse) {
      const dataDetailPost = {
        stock_no: matchingStocks,
        stock_detail_description: formValues.item_description,
        qty: 0,
        brand: formValues.brand,
        additional_info: "-",
        note: formValues.note,
        ...postLoginData,
      };

      const response1 = await AxiosInstance.post("/det-stock", [
        dataDetailPost,
      ]);

      if (response1.data) {
        const request2 = dispatch(updateStockQty(matchingStocks));
        console.log(request2, "berjalan");
      }
    } else {
      console.error("Respons pertama tidak memiliki properti 'data'");
    }
  };

  const handleMatchingStocks = async () => {
    await createItemAndPostDetails();
    onClose();
    console.log("Category matches, stock_no values:", matchingStocks);
  };

  const handleNotMatchingStocks = async () => {
    const createItemResponse = await createItemAndUnwrap();

    if (createItemResponse) {
      const dataStockPost = {
        stock_description: formValues.item_description,
        stock_qty: 0,
        category: formValues.category,
        unit: formValues.unit,
        type: "",
        note: formValues.note,
        ...postLoginData,
      };

      const responseStock = await AxiosInstance.post("/stocks", dataStockPost);

      if (responseStock.data.data) {
        const stockNo = responseStock.data.data.stock_no;
        const dataDetailPost = {
          stock_no: stockNo,
          stock_detail_description: formValues.item_description,
          qty: 0,
          brand: formValues.brand,
          additional_info: "-",
          note: formValues.note,
          ...postLoginData,
        };

        const response1 = await AxiosInstance.post("/det-stock", [
          dataDetailPost,
        ]);

        if (response1.data) {
          const request2 = dispatch(updateStockQty(matchingStocks));
          console.log(request2, "berjalan");
        }
        onClose();
      } else {
        console.error("Respons pertama tidak memiliki properti 'data'");
      }
    }
    console.log("Category does not match");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // validations
    const errors = validateFormDataItems(formValues);
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (matchingStocks.length > 0) {
      await handleMatchingStocks();
    } else {
      await handleNotMatchingStocks();
    }
  };

  const { unitOptions, categories } = useHelpersFormData();

  return (
    <form onSubmit={handleSubmitForm} className=" form_modal2">
      <h1 className="text-2xl font-semibold text-center row-span-1 col-span-3">
        Tambah Barang
      </h1>
      <hr className="border border-slate-800 w-full m-auto col-span-3" />

      <div>
        <CustomInput
          label="Deskripsi Barang"
          type="text"
          name="item_description"
          className="col-span-3 md:col-span-1"
          placeholder="Enter Your New Item Description"
          onChange={handleChangeValue}
        />
        {validationErrors.item_description && (
          <p className="text-red-500">{validationErrors.item_description}</p>
        )}
      </div>

      <div>
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
        />
        {validationErrors.unit && (
          <p className="text-red-500">{validationErrors.unit}</p>
        )}
      </div>
      <div>
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
          name="category"
          onChange={handleChangeValue}
        />
        {validationErrors.category && (
          <p className="text-red-500">{validationErrors.category}</p>
        )}
      </div>
      <div>
        <CustomInput
          label="Merek Barang"
          type="text"
          name="brand"
          className="col-span-3 md:col-span-1"
          placeholder="Enter Your New Brand "
          onChange={handleChangeValue}
        />
        {validationErrors.brand && (
          <p className="text-red-500">{validationErrors.brand}</p>
        )}
      </div>
      <div>
        <div className="gap-2 flex flex-col w-60 col-span-3 md:col-span-1">
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
        {validationErrors.status && (
          <p className="text-red-500">{validationErrors.status}</p>
        )}
      </div>
      <div>
        <div className="gap-2 flex flex-col w-60 col-span-3 md:col-span-1">
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
        {validationErrors.kondisi && (
          <p className="text-red-500">{validationErrors.kondisi}</p>
        )}
      </div>
      <div>
        <CustomInput
          label="Lokasi Barang"
          type="text"
          name="item_location"
          className="col-span-3 md:col-span-1"
          placeholder="Enter Your New Item Location"
          onChange={handleChangeValue}
        />
        {validationErrors.item_location && (
          <p className="text-red-500">{validationErrors.item_location}</p>
        )}
      </div>

      <div className="gap-2 flex flex-col w-60 row-span-2 col-span-3 md:col-span-1">
        <label>Catatan (Jika ada)</label>
        <textarea
          className="bg-slate-200 h-[120px]"
          placeholder=""
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <div>
        <CustomInput
          label="Tanggal Registrasi"
          name="date_registation"
          placeholder="Enter Your date"
          onChange={handleChangeValue}
          type="date"
          className="col-span-3 md:col-span-1"
        />
        {validationErrors.date_registation && (
          <p className="text-red-500">{validationErrors.date_registation}</p>
        )}
      </div>
      <CustomInput
        label="Tanggal Kadaluarsa (jika tidak terpakai)"
        name="date_expired"
        type="date"
        placeholder="Enter Your New date "
        className="col-span-3 md:col-span-1"
        onChange={handleChangeValue}
      />
      <div>
        <CustomInput
          label="Item Spesifikasi"
          type="text"
          name="item_specification"
          className="col-span-3 md:col-span-1"
          placeholder="Enter Your New item specification "
          onChange={handleChangeValue}
        />
        {validationErrors.item_specification && (
          <p className="text-red-500">{validationErrors.item_specification}</p>
        )}
      </div>

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

export default FormAddModalItem;
