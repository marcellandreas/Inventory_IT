import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import Title from "../../../atoms/Text/Title";
import { useSelector } from "react-redux";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CustomSelect, CustomInput, CustomTextArea } from "../../../atoms";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const FormAddApplications = () => {
  const [customNameDivision, setCustomNameDivision] = useState(false);

  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    name_pt: "",
    name_division: "",
    approved_1: "",
    approved_2: "",
    post_user_id: idUser,
    post_username: username,
  });
  console.log(formValues);
  const [approved1, setApproved1] = useState([]);
  const [approved2, setApproved2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await AxiosInstance.get("/auth/user/role/1");
        const response2 = await AxiosInstance.get("/auth/user/role/3");

        setApproved1(response1.data.data);
        setApproved2(response2.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };
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
  const handleSubmit = async () => {
    try {
      // Lakukan operasi POST ke tabel pengajuan
      const response1 = await AxiosInstance.post("/pengajuan/req", formValues);

      if (response1.data.data && response1.data.data.no_pengajuan) {
        // Dapatkan nomor_pengajuan dari respons pertama
        const no_pengajuan = response1.data.data.no_pengajuan;

        // Lakukan operasi POST ke tabel submission
        const request2 = await AxiosInstance.post("/pengajuan/sub", inputList);
        await Promise.all([response1, request2]);
        // Lakukan operasi POST ke tabel form_request
        const dataPost = inputList.map((item) => ({
          no_pengajuan: no_pengajuan,
          sub_no: item.sub_no,
        }));
        await AxiosInstance.post("/pengajuan/surat", dataPost);

        alert("Form Pengajuan Berhasil Dibuat");
        backToMenu();
      } else {
        console.error(
          "Respons pertama tidak memiliki properti 'data' atau 'no_pengajuan'"
        );
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
    }
  };

  const [countries, setCountries] = useState([
    { name: "marcell" },
    { name: "bsi" },
    { name: "ui" },
    { name: "gunadarma" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  // console.log(countries);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v2/all?fields=name")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountries(data);
  //     });
  // }, []);

  return (
    <section className="w-full  p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
      <Title>Completely fill the Form Below!</Title>
      <hr className="border border-slate-800  w-1/5 mb-5" />
      <section
        // onSubmit={handleCreateForm}
        className="flex flex-col gap-5 justify-between"
      >
        <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
          <CustomSelect
            label="Nama PT"
            options={optionsPt}
            name="name_pt"
            value={formValues.name_pt}
            onChange={handleChangeValue}
          />
          <CustomSelect
            label="Nama Divisi / Bagian"
            options={optionsDiv}
            name="name_division"
            value={formValues.name_division}
            onChange={handleChangeValue}
            disabled={formValues.name_pt === ""}
          />
          {customNameDivision && (
            <CustomInput
              label="Masukan Name Divisi"
              placeholder="Type your custom name division"
              name="name_division"
              type="text"
              value={formValues.name_division}
              onChange={handleChangeValue}
            />
          )}

          <CustomSelect
            label="Approved 1"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Approved 1
              </option>,
              ...approved1.map((approved1, index) => (
                <option key={index} value={approved1.username}>
                  {approved1.username}
                </option>
              )),
            ]}
            name="approved_1"
            value={formValues.approved_1}
            onChange={handleChangeValue}
          />
          <CustomSelect
            label="Approved 2"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Approved 2
              </option>,
              ...approved2.map((approved1, index) => (
                <option key={index} value={approved1.username}>
                  {approved1.username}
                </option>
              )),
            ]}
            name="approved_2"
            value={formValues.approved_2}
            onChange={handleChangeValue}
          />
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
                <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
                  <CustomInput
                    label="Submission no"
                    placeholder="e.g:"
                    name="sub_no"
                    type="text"
                    value={x.sub_no}
                    onChange={(e) => handleinputchange(e, i)}
                  />
                  <CustomInput
                    label="Stock Number"
                    placeholder="e.g:"
                    name="stock_no"
                    type="text"
                    value={x.stock_no}
                    onChange={(e) => handleinputchange(e, i)}
                  />

                  <CustomInput
                    label="Stock Desc"
                    placeholder="e.g:"
                    name="stock_description"
                    type="text"
                    value={x.stock_description}
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
                    label="Note (if any)"
                    placeholder=""
                    name="note"
                    value={x.note}
                    onChange={(e) => handleinputchange(e, i)}
                  />

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
      <button
        onClick={handleSubmit}
        className="button absolute right-5 bottom-2"
      >
        <MdAddCircleOutline /> <span>Tambah Pengajuan</span>
      </button>
    </section>
  );
};

export default FormAddApplications;
