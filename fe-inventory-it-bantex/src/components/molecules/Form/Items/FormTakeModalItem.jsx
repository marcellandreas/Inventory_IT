import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormTakeItem } from "../../../../config/ValidateForm";
import { CustomInput, CustomSelect } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";
import { createItem } from "../../../../Redux/Feature/ItemsSlice";
import { updateMultipleDetails } from "../../../../Redux/Feature/detailStockslice";
import { updateStockQty } from "../../../../Redux/Feature/StockSlice";
import {
  useFecthStockDetailsById,
  useFetchStockDetailsByStockNo,
} from "../../../../config/GetData";

const FormTakeModalItem = ({ onClose }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    id_detail_stock: "",
    stock_no: "",
    item_description: "",
    unit: "",
    category: "",
    brand: "",
    status: "new",
    kondisi: "Good",
    item_location: "",
    note: "",
    date_registation: "",
    date_expired: "",
    item_specification: "",
  });

  const { stockData } = useHelpersFormData();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Get detail Stock Data by No
  const [detStockData, setDetStockData] = useState([]);
  const stockDetails = useFetchStockDetailsByStockNo(formValues.stock_no);
  useEffect(() => {
    if (formValues.stock_no) {
      if (stockDetails) {
        setDetStockData(stockDetails);
      }
    }
  }, [formValues.stock_no, stockDetails]);

  // Get Stock Data by no
  const [stockForm, setStockForm] = useState({
    category: "",
    unit: "",
    type: "",
    note: "",
  });
  useEffect(() => {
    if (formValues.stock_no) {
      const fetchData = async () => {
        try {
          const res = await AxiosInstance.get(
            `/stocks/stock/${formValues.stock_no}`
          );
          const { category, unit, type, note } = res.data.stock;
          setStockForm((prevFormValues) => ({
            ...prevFormValues,
            category,
            unit,
            type,
            note,
          }));
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            id_detail_stock: "", // Mengatur id_detail_stock menjadi kosong
          }));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [formValues.stock_no]);

  // get detail stock data by id
  const [formDetStock, setFormDetStock] = useState({
    brand: "",
    item_description: "",
    qty: "",
  });
  const stockDetialsById = useFecthStockDetailsById(formValues.id_detail_stock);
  useEffect(() => {
    if (formValues.id_detail_stock && stockDetialsById) {
      const item_description = stockDetialsById.stock_detail_description;
      const brand = stockDetialsById.brand;
      const qty = stockDetialsById.qty;

      setFormDetStock((prevFormValues) => ({
        ...prevFormValues,
        item_description,
        brand,
        qty,
      }));
    }
  }, [formValues.id_detail_stock, stockDetialsById]);

  const data = {
    item_description: formDetStock.item_description,
    unit: stockForm.unit,
    category: stockForm.category,
    brand: formDetStock.brand,
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

  const handleCreateForm = async (e) => {
    e.preventDefault();
    const errors = validateFormTakeItem(formValues, data);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const dataDetailPost = [
      {
        id_detail_stock: formValues.id_detail_stock,
        qty: 1,
      },
    ];

    if (formDetStock.qty < 1) {
      alert("stock tidak tersedia");
    } else {
      const createItemResult = dispatch(createItem(data));
      if (createItemResult) {
        const updateDetailsResult = dispatch(
          updateMultipleDetails(dataDetailPost)
        );
        if (updateDetailsResult) {
          const updateStockQtyResult1 = dispatch(
            updateStockQty(formValues.stock_no)
          );
          if (updateStockQtyResult1) {
            onClose();
          }
        }
      }
    }
  };

  const { unitOptions, categories } = useHelpersFormData();

  return (
    <form onSubmit={handleCreateForm} className="form_modal2">
      <div className="  flex flex-col col-span-3 gap-4">
        <h1 className="text-2xl font-semibold text-center row-span-1 col-span-3">
          Ambil Barang
        </h1>
        <hr className="border border-slate-800 w-full m-auto col-span-3" />
        <div className="flex gap-1 flex-col">
          <h1>
            Pilih barang <span className=" text-red-700">*</span>
          </h1>
          <div className=" grid grid-cols-3 gap-4 grid-flow-dense ">
            <div>
              <CustomSelect
                label="Nomor Stok"
                options={[
                  <option key="default" value="" disabled selected>
                    Pilih Nomor Stok
                  </option>,
                  ...stockData.map((unit, index) => (
                    <option key={index} value={unit.stock_no}>
                      {`${unit.stock_no} - ${unit.stock_description}`}
                    </option>
                  )),
                ]}
                name="stock_no"
                onChange={handleChangeValue}
              />
              {validationErrors.stock_no && (
                <p className="text-red-500">{validationErrors.stock_no}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Nama Stock"
                options={[
                  <option
                    key="default"
                    value=""
                    selected={!formValues.id_detail_stock}
                  >
                    Pilih Nomor Stok
                  </option>,
                  ...detStockData.map((unit, index) => (
                    <option key={index} value={unit.id_detail_stock}>
                      {`${unit.id_detail_stock}-${unit.stock_detail_description}`}
                    </option>
                  )),
                ]}
                name="id_detail_stock"
                onChange={handleChangeValue}
              />
              {validationErrors.item_description && (
                <p className="text-red-500">
                  {validationErrors.item_description}
                </p>
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
            <div className="gap-1 flex flex-col w-60 row-span-2 col-span-3 md:col-span-1">
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
                <p className="text-red-500">
                  {validationErrors.date_registation}
                </p>
              )}
            </div>

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
                <p className="text-red-500">
                  {validationErrors.item_specification}
                </p>
              )}
            </div>
            <CustomInput
              label="Tanggal Kadaluarsa (opsional)"
              name="date_expired"
              type="date"
              placeholder="Enter Your New date "
              className="col-span-3 md:col-span-1"
              onChange={handleChangeValue}
            />
          </div>
        </div>
      </div>
      {formValues.stock_no && formValues.id_detail_stock ? (
        <div className="flex flex-col  w-full col-span-3 gap-1">
          <h1>
            info lainnya (dari stock) <span className=" text-red-700">*</span>
          </h1>
          <div className="grid grid-cols-3 w-full  gap-4">
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
              value={stockForm.unit}
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
              name="category"
              value={stockForm.category}
            />
            <CustomInput
              label="Merek Barang"
              type="text"
              name="brand"
              className="col-span-3 md:col-span-1"
              placeholder="Enter Your New Brand "
              value={formDetStock.brand ? formDetStock.brand : "undifined"}
              readOnly={true}
            />
            <div className="gap-2 flex flex-col w-60 col-span-3 md:col-span-1">
              <label>Status Barang</label>
              <div className="flex flex-wrap gap-1">
                <input
                  type="radio"
                  name="status"
                  value="used"
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.status === "used"}
                />
                <label className="ml-2">used</label>
                <input
                  type="radio"
                  name="status"
                  value="new"
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.status === "new"}
                />
                <label className="ml-2">Baru</label>
                <input
                  type="radio"
                  name="status"
                  value="reused"
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.status === "reused"}
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
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.kondisi === "Good"}
                />
                <label className="ml-2">Good</label>
                <input
                  type="radio"
                  name="kondisi"
                  value="Normal"
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.kondisi === "Normal"}
                />
                <label className="ml-2">Normal</label>
                <input
                  type="radio"
                  name="kondisi"
                  value="Bad"
                  className="border-2 border-slate-800 rounded-md p-2"
                  onChange={handleChangeValue}
                  checked={formValues.kondisi === "Bad"}
                />
                <label className="ml-2">Bad</label>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="md:col-span-1 col-span-3 hidden md:flex"></div>

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

export default FormTakeModalItem;
