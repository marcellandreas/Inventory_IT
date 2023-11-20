import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
  Title,
} from "../../components/atoms";
import {
  FormDetailStock,
  HeaderBarangPengajuan,
} from "../../components/molecules";
import { ContentLayout, MainLayout } from "../../components/templates";
import { fetchStockByNo } from "../../Redux/Feature/StockSlice";
import { fetchStockDetails } from "../../Redux/Feature/detailStockslice";
import { AxiosInstance } from "../../apis/api";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useHelpersFormData } from "../../helpers/useHelpersForm";

const EditDelCompontentsStocks = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const { stock_no } = useParams();
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

  const dispatch = useDispatch();

  const { categories, unitOptions, typeOptions } = useHelpersFormData();

  //   get by stock no
  useEffect(() => {
    dispatch(fetchStockByNo(stock_no));
  }, [dispatch, stock_no]);
  const databyStockNo = useSelector((state) => state.stocks.databyStockNo);

  useEffect(() => {
    if (databyStockNo) {
      setFormValues({
        stock_description: databyStockNo.stock_description,
        stock_qty: databyStockNo.stock_qty,
        category: databyStockNo.category,
        unit: databyStockNo.unit,
        type: databyStockNo.type,
        note: databyStockNo.note,
        post_user_id: idUser,
        post_username: username,
      });
    }
  }, [databyStockNo, stock_no]);

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
      id_detail_stock: "",
      stock_detail_description: "",
      qty: "",
      brand: "",
      additional_info: "",
      note: "",
    },
  ]);

  useEffect(() => {
    dispatch(fetchStockDetails(stock_no));
  }, [dispatch, stock_no]);
  const dataDetailStockNo = useSelector(
    (state) => state.detailStock.dataDetailStockNo
  );

  useEffect(() => {
    // Check if dataDetailStockNo is available and not empty
    if (dataDetailStockNo && dataDetailStockNo.length > 0) {
      // Create a copy of the current inputList
      const updatedInputList = [...inputList];

      // Iterate through dataDetailStockNo and update the corresponding elements in updatedInputList
      dataDetailStockNo.forEach((detail, index) => {
        updatedInputList[index] = {
          id_detail_stock: detail.id_detail_stock,
          stock_detail_description: detail.stock_detail_description,
          qty: detail.qty,
          brand: detail.brand,
          additional_info: detail.additional_info,
          note: detail.note,
        };
      });

      // Set the updatedInputList to the state
      setinputList(updatedInputList);
    }
  }, [dataDetailStockNo]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = async (index) => {
    const itemId = inputList[index].id_detail_stock;
    try {
      await AxiosInstance.delete(`det-stock/${itemId}`);
      const list = [...inputList];
      list.splice(index, 1);
      setinputList(list);
      alert("berhasil");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const [inputListPost, setinputListPost] = useState([
    {
      stock_detail_description: "",
      qty: "",
      brand: "",
      additional_info: "",
      note: "",
    },
  ]);

  const handleremovePost = (index) => {
    const list = [...inputListPost];
    list.splice(index, 1);
    setinputListPost(list);
  };

  const handleinputchangePost = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListPost];
    list[index][name] = value;
    setinputListPost(list);
  };

  const handleaddclickPost = () => {
    setinputListPost([
      ...inputListPost,
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
      const response1 = await AxiosInstance.put(
        `/stocks/${stock_no}`,
        formValues
      );

      if (response1.data) {
        const stockNo = response1.data.data.stock_no;
        const requests2 = inputList.map(async (item) => {
          const { id_detail_stock, ...rest } = item;
          rest.stockNo = stockNo; // Sertakan stockNo di dalam objek rest
          return AxiosInstance.put(`/det-stock/id/${id_detail_stock}`, {
            stock_no: stockNo,
            ...rest,
          });
        });

        // &&
        //   inputListPost.every((item) =>
        //     Object.values(item).every((value) => value === "")
        //   )

        if (inputListPost.length >= 1) {
          const dataDetailPost = inputListPost.map((item) => ({
            stock_no: stockNo,
            ...item,
          }));
          const request3 = await AxiosInstance.post(
            "/det-stock",
            dataDetailPost
          );
        } else {
          alert("berhasil");
        }

        await Promise.all([response1, ...requests2]);
        await AxiosInstance.put(`/stocks/${stockNo}/stock_qty`);
        alert("Stock berhasil dibuat");
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

  console.log(inputListPost);

  return (
    <MainLayout>
      <ContentLayout>
        <div className="flex gap-4 col-span-6">
          <button onClick={backToMenu}>
            <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
          </button>
          <Title>Perbarui Formulir Stok!</Title>
        </div>
        <hr className="border border-slate-800  w-full mb-5 col-span-6" />

        <div className="grid col-span-6 grid-flow-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 bg-slate-300 px-3 py-4 rounded-xl">
          <CustomInput
            label="Nama Barang"
            type="text"
            name="stock_description"
            placeholder="Masukan Nama Barang"
            value={formValues.stock_description}
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
            value={formValues.category}
          />
          <div className="gap-2 flex flex-col w-60 row-span-2">
            <label>Catatan (Jika ada)</label>
            <textarea
              className="bg-slate-200 h-[120px] col-span-1 row-span-2"
              placeholder=""
              name="note"
              onChange={handleChangeValue}
              value={formValues.note}
            />
          </div>
          <div className=" row-span-2"></div>

          <CustomSelect
            label="Unit"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Unit Satuan
              </option>,
              ...unitOptions.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              )),
            ]}
            name="unit"
            value={formValues.unit}
            className=" col-span-1"
            onChange={handleChangeValue}
          />

          <CustomSelect
            label="Tipe Barang"
            options={[
              <option key="default" value="" disabled selected>
                Pilih Tipe Barang
              </option>,
              ...typeOptions.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              )),
            ]}
            name="type"
            value={formValues.type}
            onChange={handleChangeValue}
          />
        </div>

        {inputList.length >= 1 ? (
          <div className="flex flex-col gap-2 col-span-6">
            <div className="flex justify-between items-end ">
              <h3 className=" text-lg font-semibold">Perbarui Stok</h3>
            </div>
            <hr />
            {inputList.map((x, i) => {
              return (
                <>
                  <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
                    <CustomInput
                      label="Nama Stok"
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
                        value={x.qty}
                        onChange={(e) => handleinputchange(e, i)}
                        type="number"
                      />
                    </div>
                    <CustomTextArea
                      label="Catatan (Jika ada)"
                      placeholder=""
                      name="note"
                      value={x.note}
                      onChange={(e) => handleinputchange(e, i)}
                    />
                    <button
                      className=" button_delete"
                      onClick={() => handleremove(i)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 col-span-6">
          <HeaderBarangPengajuan
            handleaddclick={handleaddclickPost}
            label="Barang permintaan:"
          />
          <hr />
          {inputListPost.map((x, i) => {
            return (
              <FormDetailStock
                key={i}
                x={x}
                i={i}
                inputList={inputListPost}
                handleinputchange={handleinputchangePost}
                handleremove={handleremovePost}
              />
            );
          })}
        </div>
        <button
          onClick={handleSubmit}
          className="button absolute right-5 bottom-2"
        >
          <MdEditNote />
          <span>Mengubah Stock</span>
        </button>
      </ContentLayout>
    </MainLayout>
  );
};

export default EditDelCompontentsStocks;
