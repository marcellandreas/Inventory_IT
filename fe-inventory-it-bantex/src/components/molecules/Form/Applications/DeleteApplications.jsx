import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";

const DeleteApplications = ({ onClose, id }) => {
  const [datas, setDatas] = useState("");

  useEffect(() => {
    AxiosInstance.get(`/pengajuan/form/${id}`)
      .then((res) => res.data.data.map((data) => setDatas(data.no_pengajuan)))
      .catch(() => alert("Gagal memuat data"));
  }, [id]);

  const handleDelete = () => {
    AxiosInstance.delete(`form/${id}`)
      .then(() => {
        alert("Berhasil Menghapus stok");
        onClose();
      })
      .catch(() => {
        alert("Gagal Menghapus stok");
      });
  };

  return (
    <form className="w-[450px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3">
      <h1 className="text-2xl text-center">Hapus Stock</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{datas}</div>
      </section>
      <div className="flex flex-wrap gap-2">
        <button onClick={onClose} className="button_2 flex-1">
          Kembali
        </button>
        <button className="button flex-1" onClick={handleDelete}>
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

export default DeleteApplications;
