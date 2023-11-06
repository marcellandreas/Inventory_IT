import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataItems } from "../../../../config/ValidateForm";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../../../../Redux/Feature/ItemsSlice";
import { CustomInput, CustomSelect } from "../../../atoms";
import {
  useFetchItemById,
  useFetchStockDetailsByStockNo,
  useFetchStocks,
} from "../../../../config/GetData";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";

const FormEditModalItem = ({ onClose, id, setIsLoading }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const dataItemById = useFetchItemById(id);
  const dataStocks = useFetchStocks();
  const dispatch = useDispatch();
  const { stockData } = useHelpersFormData();

  const [formValues, setFormValues] = useState({
    stock_no: "",
    id_detail_stock: "",
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

  const dataItemDescription = dataItemById.item_description;

  // Get detail Stock Data by No
  const [detStockData, setDetStockData] = useState([]);
  const stockDetails = useFetchStockDetailsByStockNo(formValues.stock_no);
  useEffect(() => {
    if (formValues.stock_no && stockDetails) {
      setDetStockData(stockDetails);
    }
  }, [formValues.stock_no, stockDetails]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);

  // get data stock_no

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
    if (formValues.stock_no === "") {
      dispatch(updateItem({ id, data: data }))
        .unwrap()
        .then(() => {
          onClose();
          alert("berhasil Edit Data");
        });
    } else if (formValues.stock_no !== "") {
      alert("dingin");
    }
  };

  // useEffect(() => {
  //   if (formValues.stock_no && formValues.item_description) {
  //     setFormValues({
  //       status: "new",
  //       kondisi: "Good",
  //       note: "",
  //       item_location: "",

  //     });
  //   }
  // });

  return (
    <form
      onSubmit={handleUpdateForm}
      className="bg-amber-400 px-4 py-2 max-h-[600px] rounded-xl overflow-y-auto grid grid-cols-3 gap-4 grid-flow-dense"
    >
      <h1 className="text-2xl font-semibold text-center row-span-1 col-span-3">
        Edit Barang
      </h1>
      <hr className="border border-slate-800 w-full m-auto col-span-3" />
      <div className="col-span-3 flex flex-col gap-2">
        <h1>
          Ubah Stock_no jika emang ingin mengubah edit nya{" "}
          <span className=" text-red-700">*</span>
        </h1>
        <div className="col-span-3 grid grid-flow-dense grid-cols-3 ">
          <div className="gap-2 flex flex-col w-60">
            <label>Items Nomer</label>
            <input
              className=" bg-slate-200 uppercase"
              readOnly
              value={formValues.item_no}
            />
          </div>
          <CustomSelect
            label="Nomor Stok"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Nomor Stok
              </option>,
              ...dataStocks.map((unit, index) => (
                <option key={index} value={unit.stock_no}>
                  {`${unit.stock_no} - ${unit.stock_description}`}
                </option>
              )),
            ]}
            name="stock_no"
            onChange={handleChangeValue}
          />
          <CustomSelect
            label="Nama Stock"
            options={[
              // <option key="default" value={formValues.item_description}>
              //   {formValues.item_description}
              // </option>,
              <option key="default" value={dataItemDescription}>
                {dataItemDescription}
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
        </div>
      </div>

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
        className="col-span-3 md:col-span-1"
      />
      <CustomInput
        label="Date Expired (jika tidak terpakai)"
        name="date_expired"
        type="date"
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

      <div className="col-span-3 flex flex-col gap-2">
        <h1>
          info lainnya (dari stock) <span className=" text-red-700">*</span>
        </h1>
        <div className="col-span-3 grid grid-flow-dense grid-cols-3 ">
          <CustomInput
            label="Satuan"
            className="col-span-3 md:col-span-1"
            value={stockForm.unit}
            readOnly={true}
          />
          <CustomInput
            label="Kategori"
            className="col-span-3 md:col-span-1"
            value={stockForm.category}
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
