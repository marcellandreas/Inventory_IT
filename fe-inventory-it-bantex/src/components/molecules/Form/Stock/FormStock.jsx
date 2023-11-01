import { CustomInput, CustomSelect } from "../../../atoms";

const FormStock = ({ handleChangeValue, categories, Unit, type }) => {
  return (
    <div className="grid grid-flow-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomInput
        label="Nama Barang"
        type="text"
        name="stock_description"
        placeholder="Masukan Nama Barang"
        className=" col-span-1"
        onChange={handleChangeValue}
      />
      <CustomSelect
        label="Kategory"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Kategory
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
        label="Unit"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Unit Satuan
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
        label="tipe Barang"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Tipe Barang
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

export default FormStock;
