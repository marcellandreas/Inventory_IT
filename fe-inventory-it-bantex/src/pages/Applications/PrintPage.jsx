import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { MdPrint } from "react-icons/md";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { ContentLayout, MainLayout } from "../../components/templates";
import { BackButton } from "../../components/atoms";

function PrintPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataDetailPengajuan, setDataDetailPengajuan] = useState([]);
  const [componentRef, setComponentRef] = useState(null);

  useEffect(() => {
    // Inisialisasi dataDetailPengajuan sebagai array kosong
    setDataDetailPengajuan([]);

    // Panggil API pertama
    AxiosInstance.get(`/pengajuan/status-sub`)
      .then((res1) => {
        // Panggil API kedua setelah API pertama selesai
        AxiosInstance.get(`/pengajuan/status-req`)
          .then((res2) => {
            // Ganti nama array "submissionData" menjadi "dataStock" pada res1.data
            res1.data.data.forEach((item) => {
              item.dataStock = item.submissionData;
              delete item.submissionData;
            });

            // Ganti nama array "RequestData" menjadi "dataStock" pada res2.data
            res2.data.data.forEach((item) => {
              item.dataStock = item.request_data;
              delete item.request_data;
            });

            // Gabungkan data dari kedua panggilan API
            const combinedData = [...res1.data.data, ...res2.data.data];
            setDataDetailPengajuan(combinedData);
            console.log(combinedData);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  console.log(dataDetailPengajuan);

  function filterDataByDateRange(dataDetailPengajuan, startDate, endDate) {
    if (!startDate || !endDate) {
      return dataDetailPengajuan; // Return semua data jika salah satu tanggal kosong
    }

    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    return dataDetailPengajuan.filter((item) => {
      const itemTimestamp = new Date(item.post_date).getTime();
      return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
    });
  }

  const filteredData = filterDataByDateRange(
    dataDetailPengajuan,
    startDate,
    endDate
  );

  console.log(filteredData);

  const backToMenu = () => {
    navigate(-1);
  };

  const printBarcode = () => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      // Validasi tanggal: endDate tidak boleh sebelum startDate
      alert("Tanggal akhir tidak boleh sebelum tanggal awal.");
      return;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: "data-stock",
    // onAfterPrint: () => alert("Berhasil print dokument"),
  });

  return (
    <MainLayout>
      <ContentLayout>
        <div className="flex col-span-6 items-center gap-2 h-10  justify-center relative text-slate-800  ">
          <BackButton onClick={backToMenu} className="absolute left-0" />
          <h1 className=" text-xl font-bold">Print Form Pengajuan</h1>
        </div>
        <section className=" col-span-6  flex gap-4 print:hidden w-full   items-center mb-10 justify-center ">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              if (
                !startDate ||
                new Date(e.target.value) >= new Date(startDate)
              ) {
                setEndDate(e.target.value);
              } else {
                alert("Tanggal akhir tidak boleh sebelum tanggal awal.");
              }
            }}
            disabled={!startDate}
          />
          <button className="button" onClick={handlePrint}>
            <MdPrint />
            Print
          </button>
        </section>
        <div
          className=" col-span-6"
          ref={(ref) => setComponentRef(ref)}
          style={{ width: "100%" }}
        >
          <div className="  print:block">
            {!startDate || !endDate ? (
              // Tampilkan semua data jika belum ada filter yang diterapkan
              dataDetailPengajuan?.map((item, index) => (
                <div key={index} className="print-page">
                  <section
                    key={index}
                    className="flex bg-white gap-3 flex-col border border-black min-h-[500px] p-3"
                  >
                    <div className=" font-semibold text-center">
                      <h3 className=" text-xl">Form Pengajuan Barang IT </h3>
                      <p className=" font-normal">
                        Atas beban PT {item.name_pt}{" "}
                      </p>
                    </div>
                    <div className=" font-semibold ">
                      <p>No: {item.no_pengajuan} </p>
                      <p>Tgl: {item.post_date.slice(0, 10)} </p>
                      <p>Bagian: {item.name_division} </p>
                    </div>
                    <div className="flex flex-col justify-between gap-2 h-[320px]  ">
                      <table className=" bg-transparent border">
                        <tr className="border py-0 m-0">
                          <th className="border py-0 m-0 border-black">No</th>
                          <th className="border py-0 m-0 border-black">
                            Nama Barang
                          </th>
                          <th className="border py-0 m-0 border-black">QTY</th>
                          <th className="border py-0 m-0 border-black">
                            Keterangan
                          </th>
                        </tr>
                        {(item.dataStock || Array(5).fill(null)).map(
                          (sub, index) => (
                            <tr key={index} className="border">
                              <td className="border py-0 m-0 border-black">
                                {index + 1}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.stock_description : ""}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.qty : ""}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.note : ""}
                              </td>
                            </tr>
                          )
                        )}
                        {item.dataStock?.length < 5 &&
                          // Mengisi baris kosong jika item kurang dari 5
                          new Array(5 - item.dataStock.length)
                            .fill(null)
                            .map((_, index) => (
                              <tr
                                key={index + item.dataStock.length}
                                className="border"
                              >
                                <td className="border py-0 m-0 border-black">
                                  {index + item.dataStock.length + 1}
                                </td>
                                <td className="border py-0 m-0 border-black"></td>
                                <td className="border py-0 m-0 border-black"></td>
                                <td className="border py-0 m-0 border-black"></td>
                              </tr>
                            ))}
                      </table>
                      <div className="flex justify-around">
                        <div className="h-36 flex flex-col items-center justify-between">
                          <p>Pemohon</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.post_username}</p>
                        </div>
                        <div className="h-36 flex flex-col items-center justify-between">
                          <p>Diketahui</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.approved_1}</p>
                        </div>
                        <div className="h-36  flex flex-col items-center justify-between">
                          <p>DiSetujui</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.approved_2}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ))
            ) : filteredData.length == 0 ? (
              <p>Data Tidak Ditemukan</p> // Tampilkan data yang telah difilter jika filter sudah diterapkan
            ) : (
              filteredData.map((item, groupIndex) => (
                <div key={groupIndex} className="print-page">
                  <section className="flex bg-white gap-3 flex-col border border-black max-h-[500px] p-3">
                    <div className=" font-semibold text-center">
                      <h3 className=" text-xl">Form Pengajuan Barang IT </h3>
                      <p className=" font-normal">
                        Atas beban PT {item.name_pt}{" "}
                      </p>
                    </div>
                    <div className=" font-semibold ">
                      <p>No: {item.no_pengajuan} </p>
                      <p>Tgl: {item.post_date.slice(0, 10)} </p>
                      <p>Bagian: {item.name_division} </p>
                    </div>
                    <div className="flex flex-col justify-between gap-2 h-[300px]  ">
                      <table className=" bg-transparent border">
                        <tr className="border py-0 m-0">
                          <th className="border py-0 m-0 border-black">No</th>
                          <th className="border py-0 m-0 border-black">
                            Nama Barang
                          </th>
                          <th className="border py-0 m-0 border-black">QTY</th>
                          <th className="border py-0 m-0 border-black">
                            Keterangan
                          </th>
                        </tr>
                        {(item.dataStock || Array(5).fill(null)).map(
                          (sub, index) => (
                            <tr key={index} className="border">
                              <td className="border py-0 m-0 border-black">
                                {index + 1}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.stock_description : ""}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.qty : ""}
                              </td>
                              <td className="border py-0 m-0 border-black">
                                {sub ? sub.note : ""}
                              </td>
                            </tr>
                          )
                        )}
                        {item.dataStock?.length < 5 &&
                          // Mengisi baris kosong jika item kurang dari 5
                          new Array(5 - item.dataStock.length)
                            .fill(null)
                            .map((_, index) => (
                              <tr
                                key={index + item.dataStock.length}
                                className="border"
                              >
                                <td className="border py-0 m-0 border-black">
                                  {index + item.dataStock.length + 1}
                                </td>
                                <td className="border py-0 m-0 border-black"></td>
                                <td className="border py-0 m-0 border-black"></td>
                                <td className="border py-0 m-0 border-black"></td>
                              </tr>
                            ))}
                      </table>
                      <div className="flex justify-around">
                        <div className="h-36 flex flex-col items-center justify-between">
                          <p>Pemohon</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.post_username}</p>
                        </div>
                        <div className="h-36 flex flex-col items-center justify-between">
                          <p>Diketahui</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.approved_1}</p>
                        </div>
                        <div className="h-36  flex flex-col items-center justify-between">
                          <p>DiSetujui</p>
                          {item.status !== "Ditolak" ? (
                            <QRCode
                              value={`${item.post_username} - ${item.no_pengajuan}`}
                              size={50}
                              fgColor="#000"
                              bgColor="#fff"
                            />
                          ) : null}
                          <p className=" font-semibold">{item.approved_2}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ))
            )}
          </div>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}

export default PrintPage;
