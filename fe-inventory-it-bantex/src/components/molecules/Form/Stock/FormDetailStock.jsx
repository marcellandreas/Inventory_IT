import { MdDelete } from "react-icons/md";
import { CustomInput, CustomTextArea } from "../../../atoms";

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
          label="Nama Stok"
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

export default FormDetailStock;
