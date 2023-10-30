import { MdDelete } from "react-icons/md";
import { CustomSelect, CustomTextArea } from "../../../atoms";

const FormRequest = ({
  stockData,
  detStockData,
  detStockQtyData,
  handleStockSelect,
  handleinputchange,
  inputList,
  handleremove,
  x,
  i,
}) => {
  return (
    <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
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
        value={x.stock_no}
        onChange={(e) => handleStockSelect(e, i)}
      />
      <CustomSelect
        label="Nama Stok"
        options={[
          <option key="default" value="" selected>
            Pilih Stok
          </option>,
          ...(detStockData[i] || []).map((unit, index) => (
            <option key={index} value={unit.id_detail_stock}>
              {`${unit.stock_detail_description}`}
            </option>
          )),
        ]}
        name="id_det_stock"
        value={x.id_det_stock}
        onChange={(e) => handleinputchange(e, i)}
      />

      <div className="gap-2 flex flex-col w-60">
        <label>Qty</label>
        <input
          className="bg-slate-200"
          placeholder={`Max: ${detStockQtyData[i]?.maxQty}`}
          name="qty"
          onChange={(e) => handleinputchange(e, i)}
          type="text"
          min={1}
          max={detStockQtyData[i]?.maxQty}
        />
      </div>
      <CustomTextArea
        label="Catatan (Jika ada)"
        placeholder=""
        name="note"
        // value={x.note}
        onChange={(e) => handleinputchange(e, i)}
      />
      {inputList.length !== 1 && (
        <button className=" button_delete" onClick={() => handleremove(i)}>
          <MdDelete />
        </button>
      )}
    </div>
  );
};

export default FormRequest;