import { MdDelete } from "react-icons/md";
import { CustomSelect, CustomTextArea } from "../../../atoms";
import { useHelpersFormData } from "../../../../helpers/useHelpersForm";

const FormRequest = ({
  detStockData,
  detStockQtyData,
  handleStockSelect,
  handleinputchange,
  inputList,
  handleremove,
  x,
  i,
}) => {
  const { stockData } = useHelpersFormData();

  return (
    <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <p>{i + 1}</p>
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
              {`${unit.stock_detail_description} ${unit.brand || ""}`}
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
          value={x.qty}
          onChange={(e) => handleinputchange(e, i)}
          type="number"
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
