import { CustomInput, CustomInput2 } from "../../../atoms";

const MoreInfo = ({ unit, brand, category, kondisi, status }) => {
  return (
    <div className="flex flex-col  w-full col-span-3 gap-1">
      <h1>
        info lainnya (dari stock) <span className=" text-red-700">*</span>
      </h1>
      <div className="grid grid-cols-6 grid-flow-dense  w-full  gap-4 ">
        <CustomInput2
          label="Satuan"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          readOnly={true}
          value={unit}
        />
        <CustomInput2
          label="Kategory"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          value={category}
          readOnly={true}
        />
        <CustomInput2
          label="Merek Barang"
          className="col-span-6 sm:col-span-3 md:col-span-2"
          value={brand ? brand : "undifined"}
          readOnly={true}
        />
        <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2">
          <label>Status Barang</label>
          <div className="flex flex-wrap gap-1">
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={status === "used"}
            />
            <label className="ml-2">used</label>
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={status === "new"}
            />
            <label className="ml-2">Baru</label>
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={status === "reused"}
            />
            <label className="ml-2">Reused</label>
          </div>
        </div>
        <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2">
          <label>Kondisi Barang</label>
          <div className="flex flex-wrap gap-1">
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={kondisi === "Good"}
            />
            <label className="ml-2">Good</label>
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={kondisi === "Normal"}
            />
            <label className="ml-2">Normal</label>
            <input
              type="radio"
              className="border-2 border-slate-800 rounded-md p-2"
              checked={kondisi === "Bad"}
            />
            <label className="ml-2">Bad</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
