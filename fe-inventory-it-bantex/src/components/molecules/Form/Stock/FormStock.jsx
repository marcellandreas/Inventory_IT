import {
  CustomInput,
  CustomInput2,
  CustomSelect,
  CustomSelect2,
} from "../../../atoms";

const FormStock = ({ handleChangeValue, categories, Unit, type }) => {
  return (
    <div className="grid grid-flow-dense grid-cols-6 gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomInput2
        label="Deskripsi Persedian"
        type="text"
        name="stock_description"
        placeholder="Masukan Deskripsi Barang"
        className="col-span-6 sm:col-span-3 md:col-span-2"
        onChange={handleChangeValue}
      />
      <CustomSelect2
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
        className="col-span-6 sm:col-span-3 md:col-span-2"
        onChange={handleChangeValue}
      />
      <div className="gap-2 flex flex-col col-span-6 sm:col-span-3 md:col-span-2 row-span-2">
        <label>Catatan (jika ada)</label>
        <textarea
          className="bg-slate-200 h-[120px] "
          placeholder=""
          name="note"
          onChange={handleChangeValue}
        />
      </div>
      <CustomSelect2
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
        className="col-span-6 sm:col-span-3 md:col-span-2"
        onChange={handleChangeValue}
      />

      <CustomSelect2
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
        className="col-span-6 sm:col-span-3 md:col-span-2"
      />
    </div>
  );
};

export default FormStock;
