import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { useDispatch } from "react-redux";
import { setLoadingPc } from "../../../../Redux/Feature/DataPc";

const FormLostConnection = ({ onClose, setIsLoading, pcInput }) => {
  const [dataPcComponent, setDataPcComponent] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    AxiosInstance.get(`pcline/${pcInput}`).then((res) => {
      setDataPcComponent(res.data.data);
    });
  }, [pcInput]);

  const handleChange = (event) => {
    const selectedItem = event.target.value;

    // Cek apakah item sudah dipilih sebelumnya
    if (!selectedValues.includes(selectedItem)) {
      const newSelectedValues = [...selectedValues, selectedItem];
      setSelectedValues(newSelectedValues);
    }
  };

  const handleItemRemove = (itemNo) => {
    // Hapus itemNo dari clickedItems
    const updatedItems = selectedValues.filter((item) => item !== itemNo);
    setSelectedValues(updatedItems);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter opsi berdasarkan input pencarian
  const filteredOptions = dataPcComponent.filter((stock) =>
    stock.item_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = [
    <option className=" capitalize" value="" disabled selected>
      Pilih Nomor Item
    </option>,
    ...filteredOptions.map((stock) => (
      <option key={stock.item_no} value={stock.item_no}>
        {stock.item_no}
      </option>
    )),
  ];

  const handleDeleteMultiple = async () => {
    try {
      const response = await AxiosInstance.delete("/pcline/delete", {
        data: { item_nos: selectedValues },
      });
      console.log("Respon dari server:", response.data);
      dispatch(setLoadingPc(true));
      setIsLoading(true);
      setSelectedValues([]);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <form
      className={`max-w-[630px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3   max-h-[600px]  overflow-y-auto`}
    >
      <h1 className="text-2xl text-center">Putuskan Koneksi</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex flex-col  gap-2 w-full justify-center">
        {selectedValues.length === 0 ? null : (
          <div>
            <p>Data yang di lepas:</p>
            <div className="flex  gap-2  flex-wrap">
              {selectedValues.map((value) => (
                <div className="p-2 flex justify-between bg-slate-700 text-white w-48 rounded-md ">
                  <p>{value}</p>
                  <button onClick={() => handleItemRemove(value)}>X</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="gap-2 flex flex-col w-60">
          <label className=" capitalize">Nomor Item</label>
          {/* <input
            type="text"
            placeholder="Cari item no..."
            value={searchTerm}
            onChange={handleSearch}
          /> */}
          <select value={selectedValues} onChange={handleChange}>
            {options}
          </select>
        </div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button onClick={handleDeleteMultiple} className="button flex-1">
          Ya, Putuskan
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
      </div>
    </form>
  );
};

export default FormLostConnection;
