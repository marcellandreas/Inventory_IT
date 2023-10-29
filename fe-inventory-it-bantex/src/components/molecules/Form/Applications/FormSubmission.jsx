import { MdDelete } from "react-icons/md";
import { CustomInput, CustomTextArea } from "../../../atoms";

const FormSubmission = ({
  i,
  x,
  handleinputchange,
  handleremove,
  inputList,
}) => {
  return (
    <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomInput
        label="Nama Barang"
        type="text"
        placeholder="Masukan Nama Barang"
        name="stock_description"
        value={x.stock_description}
        onChange={(e) => handleinputchange(e, i)}
      />
      <CustomInput
        label="Merek Barang"
        type="text"
        placeholder="Masukan Merek Barang"
        name="brand"
        value={x.brand}
        onChange={(e) => handleinputchange(e, i)}
      />

      <div className="gap-2 flex flex-col w-60">
        <label>Qty</label>
        <input
          className="bg-slate-200"
          placeholder={`Masukan Qty`}
          name="qty"
          onChange={(e) => handleinputchange(e, i)}
          type="text"
        />
      </div>
      <CustomTextArea
        label="Catatan (Jika ada)"
        placeholder=""
        name="note"
        value={x.note}
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

export default FormSubmission;
