import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataPcMaster } from "../../../../config/ValidateForm";
import { Title } from "../../../atoms";

const FormAddModalComponentPc = ({ onClose, setIsLoading, pcInput }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");

  // validation
  const [validation, setValidation] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [dataUnused, setDataUnused] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/items/unused").then((res) => {
      setDataUnused(res.data.data);
    });
  }, []);

  // select option

  const options = dataUnused.map((stock, i) => (
    <option key={i} value={stock.item_no}>
      {stock.item_no}
    </option>
  ));

  const handleChange = (event) => {
    const newSelectedValues = [...selectedValues, event.target.value];
    setSelectedValues(newSelectedValues);
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 1; i <= selectedValues.length; i++) {
      formData.append("pc_no", pcInput);
      formData.append("item_no", selectedValues[i]);
      formData.append("post_id_user", idUser);
      formData.append("post_username", username);
    }

    console.log(formData);

    await AxiosInstance.post("/pcline", formData)
      .then((res) => {
        console.log(res);
        onClose();
        setIsLoading(true);
        alert("Berhasil Menambah");
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Menambah Komponents");
      });
  };

  return (
    <section className="w-[550px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">
        Tambah Components untuk {pcInput}
      </Title>
      <hr className="border border-slate-800  w-2/5 m-0" />
      <form onSubmit={handleCreateForm} className="flex justify-between">
        <div>
          <div className="gap-2 flex flex-col w-60">
            <label>Pc Number</label>
            <input
              className=" bg-slate-200 uppercase"
              type="text"
              name="pc_no"
              value={pcInput}
              readOnly
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Items No</label>
            <select multiple value={selectedValues} onChange={handleChange}>
              {options}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {selectedValues.map((value) => (
            <p className=" button">{value}</p>
          ))}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 pt-12">
              <button
                onClick={() => {
                  onClose();
                }}
                className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white"
              >
                Kembali
              </button>
              <button className="flex-1 rounded-md bg-slate-800 text-white p-2">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormAddModalComponentPc;
