// const handleinputchange = (e, index) => {
//   const { name, value } = e.target;
//   const updatedInputList = [...inputList];
//   const maxQty = updatedInputList.maxQty;

//   if (name === "qty") {
//     const qtyValue = parseInt(value, 10);
//     // const maxQty = detStockQtyData[index].maxQty;

//     if (!isNaN(qtyValue)) {
//       if (qtyValue > maxQty) {
//         window.alert("Qty melebihi jumlah yang tersedia.");
//         // Set nilai qty menjadi kosong jika alert muncul
//         updatedInputList[index] = { ...updatedInputList[index], [name]: "" }; // Menyimpan nilai qty kosong
//         setinputList(updatedInputList); // Perbarui state inputList
//       } else {
//         updatedInputList[index] = {
//           ...updatedInputList[index],
//           [name]: qtyValue,
//         };
//         setinputList(updatedInputList); // Perbarui state inputList
//       }
//     } else {
//       // Jika nilai qty tidak dapat di-parse sebagai angka, kosongkan nilainya
//       updatedInputList[index] = { ...updatedInputList[index], [name]: "" };
//       setinputList(updatedInputList); // Perbarui state inputList
//     }
//   } else {
//     updatedInputList[index] = {
//       ...updatedInputList[index],
//       [name]: value,
//     };
//     setinputList(updatedInputList); // Perbarui state inputList
//   }
// };

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
