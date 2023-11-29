import { useState } from "react";
import { CustomInput2, CustomSelect2 } from "../../../atoms";
import Select from "react-select";

const FormStock = ({ handleChangeValue, categories, Unit, type }) => {
  const options = categories.map((option) => ({
    value: option,
    label: option,
  }));

  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);

    // Panggil fungsi handleChangeValue dan kirim nilai yang dipilih
    handleChangeValue({
      target: { name: "category", value: selected ? selected.value : "" },
    });
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customStyles = {
    control: (styles) => ({
      ...styles,
      background: selectedOption ? "rgb(226 232 240)" : styles.borderColor,
    }),
  };
  return (
    <div className="grid grid-flow-dense grid-cols-6 gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomInput2
        label="Deskripsi Persedian"
        type="text"
        name="stock_description"
        placeholder="Masukan Deskripsi Barang"
        className="col-span-6 sm:col-span-3 md:col-span-2 rounded-xl"
        onChange={handleChangeValue}
      />
      <div className="col-span-6 sm:col-span-3 md:col-span-2">
        <label>Kategori</label>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={filteredOptions}
          onInputChange={handleInputChange}
          isSearchable
          styles={customStyles}
          className=" bg-slate-800  "
          placeholder="Pilih Categori Pilihan"
        />
      </div>

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
