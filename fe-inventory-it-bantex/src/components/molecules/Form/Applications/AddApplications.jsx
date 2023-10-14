import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import Title from "../../../atoms/Text/Title";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Axios } from "axios";

const FormAddApplications = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    name_pt: "",
    name_division: "",
    item_req_date: "",
    approved_1: "",
    approved_2: "",
    post_user_id: idUser,
    post_username: username,
    no_pengajuan: "",
  });

  const dataPt = useSelector((state) => state.dataDivisionAndPT.dataPt);
  const optionsPt = [
    <option value="" disabled selected>
      Pilih Bagian Pt
    </option>,
    ...dataPt.map((stock, i) => (
      <option key={stock.name_pt} defaultValue={stock.name_pt}>
        {stock.name_pt}
      </option>
    )),
  ];
  const [dataDivision, setDataDivision] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (formValues.name_pt) {
        try {
          const res = await AxiosInstance.get(
            `/app/division/${formValues.name_pt}`
          );
          setDataDivision(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [formValues]);
  const optionsDiv = [
    <option value="" disabled selected>
      Pilih Divisi
    </option>,
    ...dataDivision.map((stock, i) => (
      <option key={stock.name_division} defaultValue={stock.name_division}>
        {stock.name_division}
      </option>
    )),
  ];
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [inputList, setinputList] = useState([
    { sub_no: "", stock_no: "", stock_description: "", qty: "", note: "" },
  ]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([
      ...inputList,
      { sub_no: "", stock_no: "", stock_description: "", qty: "", note: "" },
    ]);
  };

  const dataPost = inputList.map((item) => ({
    no_pengajuan: formValues.no_pengajuan,
    sub_no: item.sub_no,
  }));

  const handleSubmit = async () => {
    try {
      const request1 = AxiosInstance.post("/pengajuan/req", formValues);
      const request2 = AxiosInstance.post("/pengajuan/sub", inputList);
      await Promise.all([request1, request2]);
      await AxiosInstance.post("/pengajuan/surat", dataPost);
      alert("Form Pengajuan Berhasil Dibuat");
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengirim permintaan:",
        error.config.data
      );
    }
  };

  return (
    <section className="w-full bg-slate-300 p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
      <Title>Tambah Data Pengajuan</Title>
      <hr className="border border-slate-800  w-1/5 m-0" />
      <section
        // onSubmit={handleCreateForm}
        className="flex flex-col gap-2 justify-between"
      >
        <div className="flex flex-wrap gap-2">
          <div className="gap-2 flex flex-col w-full md:w-60">
            <label className="min-w-[140px]">No Pengajuan</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g:"
              name="no_pengajuan"
              type="text"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label className="min-w-[140px]">Nama PT</label>
            <div className="flex justify-end items-end gap-2">
              <select
                className="w-full bg-gray-200 rounded-md shadow-sm h-8"
                onChange={handleChangeValue}
                name="name_pt"
              >
                {optionsPt}
              </select>
            </div>
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label className="min-w-[140px]">Nama Divisi / Bagian</label>
            <div className="flex justify-end items-end gap-2">
              <select
                className="w-full bg-gray-200 rounded-md shadow-sm h-8"
                onChange={handleChangeValue}
                name="name_division"
              >
                {optionsDiv}
              </select>
            </div>
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Date </label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g:"
              name="item_req_date"
              type="date"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Approved 1 </label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g:"
              name="approved_1"
              type="text"
              onChange={handleChangeValue}
            />
          </div>
          <div className="gap-2 flex flex-col w-60">
            <label>Approved 2</label>
            <input
              className=" bg-slate-200 "
              placeholder="e.g:"
              name="approved_2"
              type="text"
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end ">
            <h3 className=" text-lg font-semibold">Barang Pengajuan:</h3>
            <button className="button" onClick={handleaddclick}>
              Tambah Barang
            </button>
          </div>
          <hr />
          {inputList.map((x, i) => {
            return (
              <>
                <div className="flex flex-wrap gap-2">
                  <div className="gap-2 flex flex-col w-60">
                    <label>Submission no</label>
                    <input
                      className="bg-slate-200"
                      placeholder="e.g:"
                      name="sub_no"
                      type="text"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div className="gap-2 flex flex-col w-60">
                    <label>Stock Number</label>
                    <input
                      className="bg-slate-200"
                      placeholder="e.g:"
                      name="stock_no"
                      type="text"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>

                  <div className="gap-2 flex flex-col w-60">
                    <label>Stock Desc</label>
                    <input
                      className="bg-slate-200"
                      placeholder="e.g:"
                      name="stock_description"
                      type="text"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
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
                  <div className="gap-2 flex flex-col w-60">
                    <label>Note (if any)</label>
                    <textarea
                      className="bg-slate-200 h-[32px]"
                      placeholder=""
                      name="note"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>

                  {inputList.length !== 1 && (
                    <button
                      className=" bg-slate-800 text-white w-8 h-8 flex justify-center items-center rounded-md  self-end"
                      onClick={() => handleremove(i)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </section>
      <section>
        <button
          onClick={handleSubmit}
          className="button absolute right-5 bottom-2"
        >
          Tambah Pengajuan
        </button>
      </section>
    </section>
  );
};

export default FormAddApplications;
