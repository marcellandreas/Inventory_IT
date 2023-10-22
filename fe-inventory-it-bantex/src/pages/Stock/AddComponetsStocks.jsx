import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
  Title,
} from "../../components/atoms";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { fetchCategories } from "../../Redux/Feature/StockSlice";
import { AxiosInstance } from "../../apis/api";
import CustomButton from "../../components/atoms/Button";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const AddComponentsStocks = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
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
  console.log(formValues);

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

  console.log(inputList);
  console.log(formValues);

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

  const categories = useSelector((state) => state.stocks.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const Unit = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const Type = ["Hardware", "Software"];
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
          <section
            // onSubmit={handleCreateForm}
            className="flex flex-col gap-5 justify-between"
          >
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
                    Pilih Category
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
                <label>Note (if any)</label>
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
                label="type Barang"
                options={[
                  <option key="default" value="" disabled selected>
                    Pilih Type Barang
                  </option>,
                  ...Type.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  )),
                ]}
                name="type"
                onChange={handleChangeValue}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end ">
                <h3 className=" text-lg font-semibold">Barang Pengajuan:</h3>
                <button className="button" onClick={handleaddclick}>
                  <MdAddCircleOutline /> Tambah Stok
                </button>
              </div>
              <hr />
              {inputList.map((x, i) => {
                return (
                  <>
                    <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
                      <CustomInput
                        label="stock_detail_description"
                        placeholder="e.g:"
                        name="stock_detail_description"
                        type="text"
                        value={x.stock_detail_description}
                        onChange={(e) => handleinputchange(e, i)}
                      />
                      <CustomInput
                        label="Merek"
                        placeholder="e.g:"
                        name="brand"
                        type="text"
                        value={x.brand}
                        onChange={(e) => handleinputchange(e, i)}
                      />

                      <CustomInput
                        label="Info Tambahan"
                        placeholder="e.g:"
                        name="additional_info"
                        type="text"
                        value={x.additional_info}
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
                          className=" bg-red-700 text-white w-8 h-8 flex justify-center items-center rounded-md  self-end"
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
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default AddComponentsStocks;
