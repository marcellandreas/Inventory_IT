import { useDispatch } from "react-redux";
import { useFetchFormDataReqSubById } from "../../../../config/GetData";
import { deleteDataReqSub } from "../../../../Redux/Feature/requestSubmissionSlice";

const DeleteApplications = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const dataReqSubById = useFetchFormDataReqSubById(id);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      dataReqSubById.status === "Diajukan" ||
      dataReqSubById.status === "Ditolak"
    ) {
      dispatch(deleteDataReqSub(id));
      alert("Berhasil Menghapus stok");
      onClose();
    } else {
      alert("Data Tidak bisa dihapus");
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
