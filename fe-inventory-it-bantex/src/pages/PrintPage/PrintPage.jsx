import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { MdPrint } from "react-icons/md";

function PrintPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dataDetailPengajuan, setDataDetailPengajuan] = useState();
  useEffect(() => {
    AxiosInstance.get(`pengajuan/form`)
      .then((res) => {
        setDataDetailPengajuan(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function filterDataByDateRange(dataDetailPengajuan, startDate, endDate) {
    if (!startDate || !endDate) {
      return dataDetailPengajuan; // Return semua data jika salah satu tanggal kosong
    }

    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    return dataDetailPengajuan.filter((item) => {
      const itemTimestamp = new Date(item.item_req_date).getTime();
      return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
    });
  }

  const filteredData = filterDataByDateRange(
    dataDetailPengajuan,
    startDate,
    endDate
  );

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
      <section className=" print:hidden w-full flex flex-col items-center mb-10 justify-center gap-2">
        <div className="flex gap-2 h-10  items-end ">
          <button
            onClick={backToMenu}
            className="button self-start absolute left-4 top-4"
          >
            Back
          </button>
          <h1 className=" text-xl font-bold">Print Form Pengajuan</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={printBarcode} className="button print:hidden w-40">
            <MdPrint />
            Cetak Print
          </button>
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
        </div>
      </section>

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
                <p className=" font-normal">Atas beban PT {item.name_pt} </p>
              </div>
              <div className=" font-semibold ">
                <p>No: {item.no_pengajuan} </p>
                <p>Tgl: {item.item_req_date.slice(0, 10)} </p>
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
                    <th className="border py-0 m-0 border-black">Keterangan</th>
                  </tr>
                  {(item.submissionData || Array(5).fill(null)).map(
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
                  {item.submissionData?.length < 5 &&
                    // Mengisi baris kosong jika item kurang dari 5
                    new Array(5 - item.submissionData.length)
                      .fill(null)
                      .map((_, index) => (
                        <tr
                          key={index + item.submissionData.length}
                          className="border"
                        >
                          <td className="border py-0 m-0 border-black">
                            {index + item.submissionData.length + 1}
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
                    <p className=" font-semibold">{item.applicant}</p>
                  </div>
                  <div className="h-36 flex flex-col items-center justify-between">
                    <p>Diketahui</p>
                    <p className=" font-semibold">{item.approved_1}</p>
                  </div>
                  <div className="h-36  flex flex-col items-center justify-between">
                    <p>DiSetujui</p>
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
                <p className=" font-normal">Atas beban PT {item.name_pt} </p>
              </div>
              <div className=" font-semibold ">
                <p>No: {item.no_pengajuan} </p>
                <p>Tgl: {item.item_req_date.slice(0, 10)} </p>
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
                    <th className="border py-0 m-0 border-black">Keterangan</th>
                  </tr>
                  {(item.submissionData || Array(5).fill(null)).map(
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
                  {item.submissionData?.length < 5 &&
                    // Mengisi baris kosong jika item kurang dari 5
                    new Array(5 - item.submissionData.length)
                      .fill(null)
                      .map((_, index) => (
                        <tr
                          key={index + item.submissionData.length}
                          className="border"
                        >
                          <td className="border py-0 m-0 border-black">
                            {index + item.submissionData.length + 1}
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
                    <p className=" font-semibold">{item.applicant}</p>
                  </div>
                  <div className="h-36 flex flex-col items-center justify-between">
                    <p>Diketahui</p>
                    <p className=" font-semibold">{item.approved_1}</p>
                  </div>
                  <div className="h-36  flex flex-col items-center justify-between">
                    <p>DiSetujui</p>
                    <p className=" font-semibold">{item.approved_2}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))
      )}
    </div>
  );
}

export default PrintPage;
