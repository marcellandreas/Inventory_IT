import { useDispatch } from "react-redux";
import { useFetchFormDataReqSubById } from "../../../../config/GetData";
import {
  deleteDataReqSub,
  fetchReqSub,
} from "../../../../Redux/Feature/requestSubmissionSlice";

const DeleteApplications = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const dataReqSubById = useFetchFormDataReqSubById(id);

  // Fungsi untuk menangani penghapusan data pengajuan
  const handleDelete = async (e) => {
    e.preventDefault();

    // Memeriksa status data pengajuan sebelum menghapus
    if (
      dataReqSubById.status === "Diajukan" ||
      dataReqSubById.status === "Ditolak"
    ) {
      try {
        // Menggunakan fungsi deleteDataReqSub dari Redux untuk menghapus data
        await dispatch(deleteDataReqSub(id));

        // Setelah penghapusan, memuat ulang data pengajuan
        dispatch(fetchReqSub());

        // Menutup modal setelah penghapusan berhasil
        onClose();
      } catch (error) {
        // Menangkap dan menampilkan pesan kesalahan jika terjadi masalah saat penghapusan
        alert("Gagal menghapus data");
      }
    } else {
      // Menampilkan pesan jika data tidak dapat dihapus karena sudah ada persetujuan
      alert("Data tidak bisa dihapus karena sudah ada persetujuan");
    }
  };

  return (
    <div className="w-[450px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3">
      <h1 className="text-2xl text-center">Hapus Stock</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{dataReqSubById.no_pengajuan}</div>
      </section>
      <div className="flex flex-wrap gap-2">
        <button onClick={onClose} className="button_2 flex-1">
          Kembali
        </button>
        <button className="button flex-1" onClick={handleDelete}>
          Ya, Hapus Sekarang
        </button>
      </div>
    </div>
  );
};

export default DeleteApplications;
