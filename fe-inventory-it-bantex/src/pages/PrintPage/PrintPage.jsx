import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";

function PrintPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    AxiosInstance.get("/items").then((res) => {
      setData(res.data.data.map((item) => item.item_no));
    });
  }, [isLoading]);

  const dataPerPage = 2;

  const groupedData = [];
  for (let i = 0; i < data.length; i += dataPerPage) {
    groupedData.push(data.slice(i, i + dataPerPage));
  }

  function filterDataByDateRange(data, startDate, endDate) {
    if (!startDate || !endDate) {
      return data; // Return semua data jika salah satu tanggal kosong
    }

    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    return data.filter((item) => {
      const itemTimestamp = new Date(item.post_date).getTime();
      return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
    });
  }

  const filteredData = filterDataByDateRange(data, startDate, endDate);

  const backToMenu = () => {
    navigate(-1);
  };

  const printBarcode = () => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      // Validasi tanggal: endDate tidak boleh sebelum startDate
      alert("Tanggal akhir tidak boleh sebelum tanggal awal.");
      return;
    }

    window.print();
  };

  return (
    <div className="p-2">
      <section className=" print:hidden w-full flex items-center  justify-center gap-2">
        <div className="flex gap-2 self-start">
          <button onClick={backToMenu} className="button">
            Back
          </button>

          <button onClick={printBarcode} className="button print:hidden w-40">
            Cetak Print
          </button>
        </div>
        <h1>Print Form Pengajuan</h1>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            if (!startDate || new Date(e.target.value) >= new Date(startDate)) {
              setEndDate(e.target.value);
            } else {
              alert("Tanggal akhir tidak boleh sebelum tanggal awal.");
            }
          }}
          disabled={!startDate}
        />
      </section>

      {!startDate || !endDate ? (
        // Tampilkan semua data jika belum ada filter yang diterapkan
        data.map((item, index) => (
          <div key={index} className="print-page">
            <section
              key={index}
              className="flex bg-white gap-3 flex-col border border-black min-h-[500px] p-3"
            >
              <div className=" font-semibold text-center">
                <h3 className=" text-xl">Form Pengajuan Barang IT </h3>
                <p className=" font-normal">Atas beban PT BMS </p>
              </div>
              <div className=" font-semibold ">
                <p>No: </p>
                <p>Tgl: </p>
                <p>Bagian: </p>
              </div>
              <table className=" bg-transparent border">
                <tr className="border py-0 m-0">
                  <th className="border p-0 m-0 border-black">No</th>
                  <th className="border p-0 m-0 border-black">Nama Barang</th>
                  <th className="border p-0 m-0 border-black">QTY</th>
                  <th className="border p-0 m-0 border-black">Keterangan</th>
                </tr>
                <tr className="border">
                  <td className="border p-0 m-0 border-black">1</td>
                  <td className="border p-0 m-0 border-black">1</td>
                  <td className="border p-0 m-0 border-black">1</td>
                  <td className="border p-0 m-0 border-black">1</td>
                </tr>
              </table>
              <div className="flex justify-around">
                <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                  <p>Pemohon</p>
                  <p className=" font-semibold">Nama Jelas</p>
                </div>
                <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                  <p>Diketahui</p>
                  <p className=" font-semibold">Nama Jelas</p>
                </div>
                <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                  <p>DiSetujui</p>
                  <p className=" font-semibold">Nama Jelas</p>
                </div>
              </div>
            </section>
          </div>
        ))
      ) : filteredData.length == 0 ? (
        <p>Data Tidak Ditemukan</p> // Tampilkan data yang telah difilter jika filter sudah diterapkan
      ) : (
        filteredData.map((group, groupIndex) => (
          <div key={groupIndex} className="print-page">
            {group.map((item, index) => (
              <section
                key={index}
                className="flex bg-white gap-3 flex-col border border-black min-h-[500px] p-3"
              >
                <div className=" font-semibold text-center">
                  <h3 className=" text-xl">Form Pengajuan Barang IT </h3>
                  <p className=" font-normal">Atas beban PT BMS </p>
                </div>
                <div className=" font-semibold ">
                  <p>No: </p>
                  <p>Tgl: </p>
                  <p>Bagian: </p>
                </div>
                <table className=" bg-transparent border">
                  <tr className="border py-0 m-0">
                    <th className="border p-0 m-0 border-black">No</th>
                    <th className="border p-0 m-0 border-black">Nama Barang</th>
                    <th className="border p-0 m-0 border-black">QTY</th>
                    <th className="border p-0 m-0 border-black">Keterangan</th>
                  </tr>
                  <tr className="border">
                    <td className="border p-0 m-0 border-black">1</td>
                    <td className="border p-0 m-0 border-black">1</td>
                    <td className="border p-0 m-0 border-black">1</td>
                    <td className="border p-0 m-0 border-black">1</td>
                  </tr>
                </table>
                <div className="flex justify-around">
                  <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                    <p>Pemohon</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                  <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                    <p>Diketahui</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                  <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
                    <p>DiSetujui</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default PrintPage;
