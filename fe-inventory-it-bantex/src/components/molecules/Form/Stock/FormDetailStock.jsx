import { MdDelete } from "react-icons/md";
import { CustomInput2 } from "../../../atoms";

const FormDetailStock = ({
  handleinputchange,
  x,
  i,
  inputList,
  handleremove,
}) => {
  return (
    <>
      <div className="grid grid-flow-dense grid-cols-6 gap-2 bg-slate-300 px-3 py-4 rounded-xl">
        <CustomInput2
          label="Detail Persedian "
          placeholder="e.g:"
          name="stock_detail_description"
          type="text"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          value={x.stock_detail_description}
          onChange={(e) => handleinputchange(e, i)}
        />
        <CustomInput2
          label="Merek"
          placeholder="e.g:"
          name="brand"
          type="text"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          value={x.brand}
          onChange={(e) => handleinputchange(e, i)}
        />

        <CustomInput2
          label="Info Tambahan"
          placeholder="e.g:"
          name="additional_info"
          type="text"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          value={x.additional_info}
          onChange={(e) => handleinputchange(e, i)}
        />

        <div className="gap-2 flex flex-col col-span-1 sm:col-span-3 md:col-span-2">
          <label>Qty</label>
          <input
            className="bg-slate-200"
            placeholder="e.g:"
            name="qty"
            onChange={(e) => handleinputchange(e, i)}
            type="number"
          />
        </div>
        <div className="gap-2 flex flex-col col-span-5 sm:col-span-3 md:col-span-2 row-span-1">
          <label>Catatan (jika ada)</label>
          <textarea
            label="Catatan (jika ada)"
            placeholder=""
            name="note"
            value={x.note}
            onChange={(e) => handleinputchange(e, i)}
          />
        </div>

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

export default FormDetailStock;
