import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components/atoms";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { AxiosInstance } from "../../apis/api";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  FormDetailStock,
  FormStock,
  HeaderBarangPengajuan,
} from "../../components/molecules";
import { useHelpersFormData } from "../../helpers/useHelpersForm";

const AddComponentsStocks = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const { categories, unitOptions, typeOptions } = useHelpersFormData();
  const [formValues, setFormValues] = useState({
    stock_description: "",
    stock_qty: "",
    category: "",
    unit: "",
    type: "",
    note: "",
    post_user_id: idUser,
    post_username: username,
  });

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [inputList, setinputList] = useState([
    {
      stock_detail_description: "",
      qty: "",
      brand: "",
      additional_info: "",
      note: "",
    },
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
      {
        stock_detail_description: "",
        qty: "",
        brand: "",
        additional_info: "",
        note: "",
      },
    ]);
  };
  const handleSubmit = async () => {
    try {
      // Lakukan operasi POST ke tabel pengajuan
      const response1 = await AxiosInstance.post("/stocks", formValues);

      if (response1.data.data) {
        // Dapatkan nomor_pengajuan dari respons pertama
        const stockNo = response1.data.data.stock_no;

        console.log(response1.data.data.stock_no);

        // Lakukan operasi POST ke tabel submission
        const dataDetailPost = inputList.map((item) => ({
          stock_no: stockNo,
          sub_no: item.sub_no,
          stock_detail_description: item.stock_detail_description,
          qty: item.qty,
          brand: item.brand,
          additional_info: item.additional_info,
          note: item.note,
        }));
        const request2 = await AxiosInstance.post("/det-stock", dataDetailPost);
        await Promise.all([response1, request2]);

        await AxiosInstance.put(`/stocks/${stockNo}/stock_qty`);

        alert("Stock nya Berhasil Dibuat");
        backToMenu();
      } else {
        console.error(
          "Respons pertama tidak memiliki properti 'data' atau 'stock_no'"
        );
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
    }
  };

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="w-full  p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
          <div className="flex gap-4">
            <button onClick={backToMenu}>
              <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
            </button>
            <Title>Tambahkan Formulir Stok!</Title>
          </div>
          <hr className="border border-slate-800  w-full mb-5" />
          <section className="flex flex-col gap-5 justify-between">
            <FormStock
              handleChangeValue={handleChangeValue}
              categories={categories}
              Unit={unitOptions}
              type={typeOptions}
            />
            <div className="flex flex-col gap-2">
              <HeaderBarangPengajuan
                handleaddclick={handleaddclick}
                label="Tambah Stock:"
              />
              <hr />
              {inputList.map((x, i) => {
                return (
                  <FormDetailStock
                    key={i}
                    handleinputchange={handleinputchange}
                    x={x}
                    i={i}
                    formValues={formValues}
                    inputList={inputList}
                    handleremove={handleremove}
                  />
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
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default AddComponentsStocks;
