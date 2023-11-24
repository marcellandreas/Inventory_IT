import { CustomInput, CustomSelect, CustomTextArea } from "../../../atoms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockById } from "../../../../Redux/Feature/StockSlice";
import { AxiosInstance } from "../../../../apis/api";
import { MdDelete } from "react-icons/md";

const FormStock = ({ handleChangeValue, categories, Unit, type }) => {
  return (
    <div className="grid grid-flow-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomInput
        label="Deskripsi Persedian"
        type="text"
        name="stock_description"
        placeholder="Masukan Deskripsi Barang"
        className=" col-span-1"
        onChange={handleChangeValue}
      />
      <CustomSelect
        label="Kategori"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Kategori Persedian
          </option>,
          ...categories.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          )),
        ]}
        name="category"
        className=" col-span-1"
        onChange={handleChangeValue}
      />
      <div className="gap-2 flex flex-col w-60 row-span-2">
        <label>Catatan (jika ada)</label>
        <textarea
          className="bg-slate-200 h-[120px] col-span-1 row-span-2"
          placeholder=""
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <div className=" row-span-2"></div>
      <CustomSelect
        label="Satuan"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Satuan Persedian
          </option>,
          ...Unit.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          )),
        ]}
        name="unit"
        className=" col-span-1"
        onChange={handleChangeValue}
      />

      <CustomSelect
        label="Tipe"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Tipe Persedian
          </option>,
          ...type.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          )),
        ]}
        name="type"
        onChange={handleChangeValue}
      />
    </div>
  );
};

const FormDeleteModalStock = ({ onClose, id }) => {
  const dataStockById = useSelector((state) => state.stocks.dataStockById);
  const dispatch = useDispatch();

  const [datas, setDatas] = useState("");
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
      setDatas(dataStockById.stock_description);
    }
  }, [dataStockById, id]);

  const handleDelete = () => {
    AxiosInstance.delete(`stocks/${id}`)
      .then(() => {
        alert("Berhasil Menghapus stok");
        onClose();
      })
      .catch(() => {
        alert("Gagal Menghapus stok");
      });
  };
  return (
    <form className="w-[450px] bg-amber-500 p-4 rounded-xl flex flex-col gap-3">
      <h1 className="text-2xl text-center">Hapus Stock</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{datas}</div>
      </section>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button className="button flex-1" onClick={handleDelete}>
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

const FormDetailStock = ({
  handleinputchange,
  x,
  i,
  inputList,
  handleremove,
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
        <CustomInput
          label="Detail Persedian "
          placeholder="e.g:"
          name="stock_detail_description"
          type="text"
          value={x.stock_detail_description}
          onChange={(e) => handleinputchange(e, i)}
        />
        <CustomInput
          label="Merek"
          placeholder="e.g:"
          name="brand"
          type="text"
          value={x.brand}
          onChange={(e) => handleinputchange(e, i)}
        />

        <CustomInput
          label="Info Tambahan"
          placeholder="e.g:"
          name="additional_info"
          type="text"
          value={x.additional_info}
          onChange={(e) => handleinputchange(e, i)}
        />

        <div className="gap-2 flex flex-col w-[60px]">
          <label>Qty</label>
          <input
            className="bg-slate-200"
            placeholder="e.g:"
            name="qty"
            onChange={(e) => handleinputchange(e, i)}
            type="number"
          />
        </div>
        <CustomTextArea
          label="Catatan (jika ada)"
          placeholder=""
          name="note"
          value={x.note}
          onChange={(e) => handleinputchange(e, i)}
        />

        {inputList.length !== 1 && (
          <button
            className=" bg-red-700 text-white w-8 h-8 flex justify-center items-center rounded-md  self-end"
            onClick={() => handleremove(i)}
          >
            <MdDelete />
          </button>
        )}
      </div>
    </>
  );
};

export { FormDeleteModalStock, FormDetailStock, FormStock };
