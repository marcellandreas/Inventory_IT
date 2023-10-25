import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Title, CustomSelect, CustomTextArea } from "../../components/atoms";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import FormRequest from "../../components/molecules/Form/Applications/FormRequest";

const MakeAGoodsRequest = React.memo(() => {
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

  // useEffect(() => {
  //   // Gunakan async function untuk mengambil data berdasarkan id_det_stock
  //   const fetchDataForQtyStock = async (idDetStock, index) => {
  //     try {
  //       if (idDetStock) {
  //         const response = await AxiosInstance.get(
  //           `/det-stock/id/${idDetStock}`
  //         );
  //         const data = response.data.data;

  //         // Tambahkan data ke dalam state detStockQtyData
  //         setDetStockQtyData((prevData) => {
  //           const updatedData = [...prevData];
  //           updatedData[index] = {
  //             maxQty: data.qty, // Mengambil hanya data qty dari respons
  //             stock_description: data.stock_detail_description,
  //           };
  //           return updatedData;
  //         });
  //       }
  //     } catch (error) {
  //       console.error(
  //         `Terjadi kesalahan saat mengambil data untuk id_det_stock ${idDetStock}: ${error}`
  //       );
  //     }
  //   };

  //   // Membuat array promises berdasarkan inputList
  //   const promises = inputList.map((item, index) =>
  //     fetchDataForQtyStock(item.id_det_stock, index)
  //   );

  //   // Melakukan permintaan secara paralel
  //   Promise.all(promises);
  // }, [inputList]);

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

    if (name === "qty") {
      const qtyValue = parseInt(value, 10);
      const maxQty = detStockQtyData[index].maxQty;

      if (!isNaN(qtyValue)) {
        if (qtyValue > maxQty) {
          window.alert("Qty melebihi jumlah yang tersedia.");
          // Set nilai qty menjadi kosong jika alert muncul
          updatedInputList[index] = { ...updatedInputList[index], [name]: "" }; // Menyimpan nilai qty kosong
          setinputList(updatedInputList); // Perbarui state inputList
        } else {
          updatedInputList[index] = {
            ...updatedInputList[index],
            [name]: qtyValue,
          };
          setinputList(updatedInputList); // Perbarui state inputList
        }
      } else {
        // Jika nilai qty tidak dapat di-parse sebagai angka, kosongkan nilainya
        updatedInputList[index] = { ...updatedInputList[index], [name]: "" };
        setinputList(updatedInputList); // Perbarui state inputList
      }
    } else {
      updatedInputList[index] = {
        ...updatedInputList[index],
        [name]: value,
      };
      setinputList(updatedInputList); // Perbarui state inputList
    }
  };

  console.log(inputList);

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
      // Validasi qty sebelum melakukan operasi POST
      const isQtyValid = inputList.every(
        (item, index) => item.qty <= detStockQtyData[index].maxQty
      );

      if (!isQtyValid) {
        alert("Qty melebihi jumlah yang tersedia.");
        return;
      }

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
    <Sidebar>
      <LayoutContentDashboard>
        <section className="w-full  p-2 rounded-xl flex flex-col gap-3   min-h-[600px]  overflow-y-auto">
          <Title>Buat Pengajuan Barang!</Title>
          <hr className="border border-slate-800 mb-5" />
          <section className="flex flex-col gap-5 justify-between">
            <FormRequest
              handleChangeValue={handleChangeValue}
              formValues={formValues}
            />
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
                  <div
                    key={i}
                    className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl"
                  >
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

                    <div className="gap-2 flex flex-col w-60">
                      <label>Nama Barang</label>
                      <input
                        className="bg-slate-200"
                        placeholder="e.g:"
                        name="stock_description"
                        type="text"
                        Value={
                          detStockQtyData[i]
                            ? detStockQtyData[i].stock_description
                            : ""
                        }
                        onFocus={(e) => {
                          if (!detStockQtyData[i]) {
                            // Hanya isi input jika data kosong
                            e.target.value = "";
                            handleinputchange(e, i);
                          }
                        }}
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>

                    <div className="gap-2 flex flex-col w-60">
                      <label>Qty</label>
                      <input
                        className="bg-slate-200"
                        placeholder={`Max: ${detStockQtyData[i]?.maxQty}`}
                        name="qty"
                        onChange={(e) => handleinputchange(e, i)}
                        type="text"
                        min={1}
                        max={detStockQtyData[i]?.maxQty}
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
});

export default MakeAGoodsRequest;
