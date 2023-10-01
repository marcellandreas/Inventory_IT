import { useEffect } from "react";
import { AxiosInstance } from "../../../apis/api";

const TableStocks = ({ setEditModalStock, setDeleteModalStock }) => {
  const data = [
    {
      id: 1,
      kode_barang: "HDD001",
      nama_barang: "HDD",
      jumlah: 1,
      satuan: "Unit",
      kondisi: "Bekas",
      keterangan_baru_bekas: {
        rusak: "Tidak",
        berfungsi: "Ya",
      },
      lokasi_penyimpanan: "Ruang IT",
      keterangan: "Server",
    },
  ];

  //   useEffect(async() => {
  //    await AxiosInstance.get('/user').then((res) => {

  //    })
  //   })
  return (
    <table className="min-w-full backdrop-blur-md bg-opacity-50 overflow-x-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Kode Barang</th>
          <th className="px-4 py-2">Nama Barang</th>
          <th className="px-4 py-2">Jumlah</th>
          <th className="px-4 py-2">Satuan</th>
          <th className="px-4 py-2">Kondisi</th>
          <th className="px-4 py-2">Rusak</th>
          <th className="px-4 py-2">Berfungsi</th>
          <th className="px-4 py-2">Lokasi Penyimpanan</th>
          <th className="px-4 py-2">Keterangan</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((barang) => (
          <tr key={barang.id}>
            <td className="border px-4 py-2">{barang.id}</td>
            <td className="border px-4 py-2">{barang.kode_barang}</td>
            <td className="border px-4 py-2">{barang.nama_barang}</td>
            <td className="border px-4 py-2">{barang.jumlah}</td>
            <td className="border px-4 py-2">{barang.satuan}</td>
            <td className="border px-4 py-2">{barang.kondisi}</td>
            <td className="border px-4 py-2">
              {barang.keterangan_baru_bekas.rusak}
            </td>
            <td className="border px-4 py-2">
              {barang.keterangan_baru_bekas.berfungsi}
            </td>
            <td className="border px-4 py-2">{barang.lokasi_penyimpanan}</td>
            <td className="border px-4 py-2">{barang.keterangan}</td>
            <aside className="flex gap-2">
              <button
                onClick={() => {
                  setEditModalStock(true);
                }}
                className="p-3 bg-blue-600 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteModalStock(true);
                }}
                className="p-3 bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </aside>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStocks;
