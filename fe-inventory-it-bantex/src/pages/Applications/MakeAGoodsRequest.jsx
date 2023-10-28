import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Title,
  CustomSelect,
  CustomTextArea,
  CustomInput,
} from "../../components/atoms";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import FormApplication from "../../components/molecules/Form/Applications/FormApplication";
import FormRequest from "../../components/molecules/Form/Applications/FormRequest";
import { HeaderBarangPengajuan } from "../../components/molecules";
import FormSubmission from "../../components/molecules/Form/Applications/FormSubmission";
import { backToMenu } from "../../helpers/navigate";

function PageHeader({ title, onBackClick }) {
  return (
    <div className="flex gap-2">
      <button onClick={onBackClick} className="button">
        Back
      </button>
      <Title>{title}</Title>
    </div>
  );
}

const MakeAGoodsRequest = React.memo(() => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    name_pt: "",
    name_division: "",
    approved_1: "",
    approved_2: "",
    request_type: "",
    post_user_id: idUser,
    post_username: username,
  });

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/stocks");
        const fetchedStockData = response.data.data.map(
          ({ stock_no, stock_description }) => ({ stock_no, stock_description })
        );
        setStockData(fetchedStockData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [inputList, setinputList] = useState([
    {
      stock_no: "",
      id_det_stock: "",
      stock_description: "",
      totalqty: "",
      qty: "",
      note: "",
    },
  ]);

  const [debouncedInputList, setDebouncedInputList] = useState(inputList);

  // Effect untuk memperbarui debouncedInputList saat inputList berubah
  useEffect(() => {
    // Atur timeout untuk melakukan debounce
    const debounceTimeout = setTimeout(() => {
      setDebouncedInputList(inputList);
    }, 300); // Sesuaikan timeout sesuai kebutuhan

    // Membersihkan timeout pada setiap perubahan inputList
    return () => clearTimeout(debounceTimeout);
  }, [inputList]);

  const handleStockSelect = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].stock_no = value;
    setinputList(list);
  };

  useEffect(() => {
    const initialInputList = {
      stock_no: "",
      id_det_stock: "",
      stock_description: "",
      totalqty: "",
      qty: "",
      note: "",
    };

    const newInputList =
      formValues.request_type === "REQUEST" ||
      formValues.request_type === "SUBMISSION"
        ? [initialInputList]
        : [];

    setinputList(newInputList);
  }, [formValues.request_type]);

  console.log(inputList);

  const [detStockData, setDetStockData] = useState([]);

  useEffect(() => {
    // Gunakan async function untuk mengambil data berdasarkan stock_no
    const fetchDataForStockDetail = async (stockNo, index) => {
      try {
        if (stockNo) {
          const response = await AxiosInstance.get(`/det-stock/no/${stockNo}`);
          const data = response.data.data;

          // Tambahkan data ke dalam state detStockData
          setDetStockData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index] = data;
            return updatedData;
          });
        }
      } catch (error) {
        console.error(
          `Terjadi kesalahan saat mengambil data untuk stock_no ${stockNo}: ${error}`
        );
      }
    };

    // Membuat array promises berdasarkan inputList
    const promises = inputList.map((item, index) =>
      fetchDataForStockDetail(item.stock_no, index)
    );

    // Melakukan permintaan secara paralel
    Promise.all(promises);
  }, [inputList]);

  const [detStockQtyData, setDetStockQtyData] = useState([]);

  useEffect(() => {
    const fetchDataForQtyStock = async (idDetStock, index) => {
      try {
        if (idDetStock) {
          const response = await AxiosInstance.get(
            `/det-stock/id/${idDetStock}`
          );
          const data = response.data.data;

          const updatedInputList = [...inputList];
          updatedInputList[index] = {
            ...updatedInputList[index],
            maxQty: data.qty, // Mengambil hanya data qty dari respons
            stock_description: data.stock_detail_description,
          };

          setinputList(updatedInputList);
        }
      } catch (error) {
        console.error(
          `Terjadi kesalahan saat mengambil data untuk stock_no ${idDetStock}: ${error}`
        );
      }
    };

    const fetchQtyForStockDetails = async () => {
      const promises = inputList.map((item, index) => {
        return fetchDataForQtyStock(item.id_det_stock, index);
      });

      await Promise.all(promises);
    };

    fetchQtyForStockDetails();
  }, [...inputList.map((item, index) => item.id_det_stock)]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const updatedInputList = [...inputList];
    const maxQty = updatedInputList[index].maxQty;

    if (name === "qty") {
      const qtyValue = parseInt(value, 10);

      if (!isNaN(qtyValue) && qtyValue > maxQty) {
        alert("Qty melebihi jumlah yang tersedia.");
      } else {
        updatedInputList[index][name] = qtyValue;
      }
    } else {
      updatedInputList[index][name] = value;
    }

    setinputList(updatedInputList);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list[index].stock_no = "";
    list[index].stock_description = "";
    list[index].qty = "";
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([
      ...inputList,
      {
        stock_no: "",
        id_det_stock: "",
        stock_description: "",
        totalqty: "",
        qty: "",
        note: "",
      },
    ]);
  };

  // navigate
  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      if (formValues.request_type === "REQUEST") {
        const isQtyValid = inputList.every((item) => item.qty <= item.maxQty);
        if (!isQtyValid) {
          alert("Qty melebihi jumlah yang tersedia.");
          return;
        }
      }

      const response1 = await AxiosInstance.post("/pengajuan/req", formValues);
      const { data } = response1.data;
      const no_pengajuan = data?.no_pengajuan;

      if (!no_pengajuan) {
        console.error(
          "Respons pertama tidak memiliki properti 'data' atau 'no_pengajuan'"
        );
        return;
      }

      const postData = inputList.map((item) => {
        const commonFields = {
          no_pengajuan,
          stock_description: item.stock_description,
          qty: item.qty,
          note: item.note,
        };
        return formValues.request_type === "REQUEST"
          ? { ...commonFields, stock_no: item.stock_no }
          : commonFields;
      });

      const endpoint =
        formValues.request_type === "REQUEST" ? "/req-form" : "/sub-form";
      await AxiosInstance.post(endpoint, postData);

      alert("Form Pengajuan Berhasil Dibuat");
      backToMenu();
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
    }
  };

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="w-full  p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
          <PageHeader
            title="Buat Entri Permintaan atau Pengajuan"
            onBackClick={backToMenu}
          />
          <hr className="border border-slate-800 mb-5" />
          <section className="flex flex-col gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end ">
                <h3 className=" text-lg font-semibold">Pemohon:</h3>
              </div>
              <FormApplication
                handleChangeValue={handleChangeValue}
                formValues={formValues}
              />
            </div>
            {formValues &&
              (formValues.request_type === "REQUEST" ||
                formValues.request_type === "SUBMISSION") && (
                <div className="flex flex-col gap-2">
                  {formValues.request_type === "REQUEST" ? (
                    <HeaderBarangPengajuan
                      handleaddclick={handleaddclick}
                      label="Barang permintaan:"
                    />
                  ) : (
                    <HeaderBarangPengajuan
                      handleaddclick={handleaddclick}
                      label="Barang pengajuan:"
                    />
                  )}
                  <hr />
                  {inputList.map((x, i) => {
                    return formValues.request_type === "REQUEST" ? (
                      <FormRequest
                        key={i}
                        x={x}
                        i={i}
                        stockData={stockData}
                        detStockData={detStockData}
                        detStockQtyData={detStockQtyData}
                        handleStockSelect={handleStockSelect}
                        handleinputchange={handleinputchange}
                        inputList={inputList}
                        handleremove={handleremove}
                      />
                    ) : (
                      <FormSubmission
                        key={i}
                        x={x}
                        i={i}
                        handleinputchange={handleinputchange}
                        handleremove={handleremove}
                        inputList={inputList}
                      />
                    );
                  })}
                </div>
              )}
          </section>
          {formValues && formValues.request_type !== "" && (
            <button
              onClick={handleSubmit}
              className="button absolute right-5 bottom-2"
            >
              <MdAddCircleOutline />{" "}
              <span className="capitalize">
                Tambah {`${formValues.request_type}`}
              </span>
            </button>
          )}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
});

export default MakeAGoodsRequest;
