import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { Title } from "../../../atoms";

const FormAddModalComponentPc2 = ({ onClose, setIsLoading, pcInput }) => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");

  const [formValues, setFormValues] = useState({
    pc_no: pcInput,
    item_no: "",
    post_id_user: idUser,
    post_username: username,
  });

  // validation
  const [selectedValues, setSelectedValues] = useState([]);
  const [dataUnused, setDataUnused] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/items/unused").then((res) => {
      setDataUnused(res.data.data);
    });
  }, []);

  console.log(formValues, "data masuk");

  console.table(formValues);
  const data = {
    pc_no: formValues.pc_no,
    item_no: formValues.item_no,
    post_user_id: formValues.post_id_user,
    post_username: formValues.post_username,
  };
  // select option

  const options = [
    <option value="" disabled selected>
      Pilih item no
    </option>,
    ...dataUnused.map((stock, i) => (
      <option key={stock.item_no} defaultValue={stock.item_no}>
        {stock.item_no}
      </option>
    )),
  ];

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreateForm = (e) => {
    e.preventDefault();

    console.log(data);
    AxiosInstance.post("/pcline", data)
      .then((res) => {
        console.log(res);
        onClose();
        setIsLoading(true);
        alert("Berhasil Menambah Komponets");
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Menambah Komponents");
      });
  };

  return (
    <section className="form_modal  max-h-[600px]  overflow-y-auto">
      <Title className="text-2xl text-center">Tambah Components</Title>

      <hr className="border border-slate-800  w-2/5 m-0" />
      <form
        onSubmit={handleCreateForm}
        className="flex flex-col justify-between"
      >
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
          <label className="min-w-[140px]">Items Number</label>
          <div className="flex justify-end items-end gap-2">
            <select
              className="w-full bg-gray-200 rounded-md shadow-sm h-8"
              onChange={handleChangeValue}
              name="item_no"
            >
              {options}
            </select>
          </div>
        </div>

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
      </form>
    </section>
  );
};

export default FormAddModalComponentPc2;
