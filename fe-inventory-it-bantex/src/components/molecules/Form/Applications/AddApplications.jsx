import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import Title from "../../../atoms/Text/Title";
import { useSelector } from "react-redux";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CustomSelect, CustomInput, CustomTextArea } from "../../../atoms";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const FormAddApplications = React.memo(() => {
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
  const [approved1, setApproved1] = useState([]);
  const [approved2, setApproved2] = useState([]);
  const [stockData, setStockData] = useState([]);

  const fetchData = async () => {
    try {
      const [response1, response2, response3] = await Promise.all([
        AxiosInstance.get("/auth/user/role/1"),
        AxiosInstance.get("/auth/user/role/3"),
        AxiosInstance.get("/stocks"),
      ]);

      setApproved1(response1.data.data);
      setApproved2(response2.data.data);
      const fetchedStockData = response3.data.data.map(
        ({ stock_no, stock_description }) => ({ stock_no, stock_description })
      );
      setStockData(fetchedStockData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <option key={i} defaultValue={stock.name_division}>
        {stock.name_division}
      </option>
    )),
  ];
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

  console.log(inputList);

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
    console.log(detStockData);

    // Membuat array promises berdasarkan inputList
    const promises = inputList.map((item, index) =>
      fetchDataForStockDetail(item.stock_no, index)
    );

    // Melakukan permintaan secara paralel
    Promise.all(promises);
  }, [inputList]);

  // useEffect(() => {
  //   const fetchDataForStockDetail = async (stockNo, index) => {
  //     try {
  //       if (stockNo && stockNo !== inputList[index]) {
  //         const response = await AxiosInstance.get(`/det-stock/no/${stockNo}`);
  //         const data = response.data.data;

  //         const updatedInputList = [...inputList];
  //         updatedInputList[index].dataDetStock = data;

  //         setinputList(updatedInputList);
  //       }
  //     } catch (error) {}
  //   };

  //   for (let i = 0; i < inputList.length; i++) {
  //     const stockNo = inputList[i].stock_no;
  //     const index = i;
  //     fetchDataForStockDetail(stockNo, index);
  //   }
  // }, [inputList]);

  // useEffect(() => {
  //   const fetchDataForStockDetail = async (stockNo, index) => {
  //     try {
  //       if (stockNo && stockNo !== inputList[index].stock_no) {
  //         const response = await AxiosInstance.get(`/det-stock/no/${stockNo}`);
  //         const data = response.data.data;

  //         setinputList((prevInputList) => {
  //           const updatedInputList = [...prevInputList];
  //           updatedInputList[index].dataDetStock = data;
  //           updatedInputList[index].stock_no = stockNo; // Perbarui stock_no juga
  //           return updatedInputList;
  //         });
  //       }
  //     } catch (error) {
  //       console.error(
  //         `Terjadi kesalahan saat mengambil data untuk stock_no ${stockNo}: ${error}`
  //       );
  //     }
  //   };

  //   // Buat daftar promises untuk pemanggilan API
  //   const promises = inputList.map((item, index) => {
  //     return fetchDataForStockDetail(item.stock_no, index);
  //   });

  //   // Gunakan Promise.all untuk menunggu pemanggilan selesai
  //   Promise.all(promises);
  // }, [inputList]);

  const [detStockQtyData, setDetStockQtyData] = useState([]);
  useEffect(() => {
  // Gunakan async function untuk mengambil data berdasarkan id_det_stock
  const fetchDataForQtyStock = async (idDetStock, index) => {
    try {
      if (idDetStock) {
        const response = await AxiosInstance.get(`/det-stock/id/${idDetStock}`);
        const data = response.data.data;

        // Tambahkan data ke dalam state detStockQtyData
        setDetStockQtyData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = {
            maxQty: data.qty, // Mengambil hanya data qty dari respons
            stock_description: data.stock_detail_description,
          };
          return updatedData;
        });
      }
    } catch (error) {
      console.error(
        `Terjadi kesalahan saat mengambil data untuk id_det_stock ${idDetStock}: ${error}`
      );
    }
  };

  // Membuat array promises berdasarkan inputList
  const promises = inputList.map((item, index) =>
    fetchDataForQtyStock(item.id_det_stock, index)
  );

  // Melakukan permintaan secara paralel
  Promise.all(promises);
}, [inputList]);
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
  }, [inputList]);

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
      const response1 = await AxiosInstance.post("/pengajuan/req", formValues);
      if (response1.data.data && response1.data.data.no_pengajuan) {
        const no_pengajuan = response1.data.data.no_pengajuan;
        const dataPost = inputList.map((item) => ({
          no_pengajuan: no_pengajuan,
          stock_no: item.stock_no,
          stock_description: item.stock_description,
          qty: item.qty,
          note: item.note,
        }));
        // Lakukan operasi POST ke tabel submission
        const request2 = await AxiosInstance.post("/pengajuan/sub", dataPost);
        await Promise.all([response1, request2]);
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

  return (
    <section className="w-full  p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
      <Title>Buat Pengajuan Barang!</Title>
      <hr className="border border-slate-800 mb-5" />
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
              <MdAddCircleOutline /> <span>Tambah Barang</span>
            </button>
          </div>
          <hr />
          {inputList.map((x, i) => {
            return (
              <>
                <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
                  <CustomSelect
                    label="Nomor Stok"
                    options={[
                      <option key="default" value="" disabled selected>
                        Pilih Nomor Stok
                      </option>,
                      ...stockData.map((unit, index) => (
                        <option key={index} value={unit.stock_no}>
                          {`${unit.stock_no} - ${unit.stock_description}`}
                        </option>
                      )),
                    ]}
                    name="stock_no"
                    value={x.stock_no}
                    onChange={(e) => handleStockSelect(e, i)}
                  />
                  <CustomSelect
                    label="Nama Stok"
                    options={[
                      <option key="default" value="" selected>
                        Pilih Stok
                      </option>,
                      ...(detStockData[i] || []).map((unit, index) => (
                        <option key={index} value={unit.id_detail_stock}>
                          {`${unit.stock_detail_description}`}
                        </option>
                      )),
                    ]}
                    name="id_det_stock"
                    value={x.id_det_stock}
                    onChange={(e) => handleinputchange(e, i)}
                  />

                  <div className=" hidden">
                    <CustomInput
                      label="Stock Desc"
                      placeholder="e.g:"
                      name="stock_description"
                      type="text"
                      value={x.stock_description}
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
                  <CustomTextArea
                    label="Catatan (Jika ada)"
                    placeholder=""
                    name="note"
                    // value={x.note}
                    onChange={(e) => handleinputchange(e, i)}
                  />

                  {inputList.length !== 1 && (
                    <button
                      className=" button_delete"
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
});

export default FormAddApplications;
