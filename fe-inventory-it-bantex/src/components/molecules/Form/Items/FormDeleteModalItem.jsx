import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../../../Redux/Feature/ItemsSlice";

const FormDeleteModalItem = ({ onClose, id }) => {
  const [data, setData] = useState("");
  const formValuesId = useSelector((state) => state.itemsSlice.dataById);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formValuesId.length > 0) {
      setData(formValuesId[0].item_description);
    }
  }, [formValuesId]);

  const handleDelete = () => {
    dispatch(deleteItem(id))
      .unwrap()
      .then(() => {
        alert("Berhasil dihapus");
        onClose();
      })
      .catch((error) => {
        alert("Gagal dihapus: " + error.message);
      });
  };
  return (
    <form className="form_modal">
      <div className=" ">
        <h1 className="text-xl font-bold text-center">Hapus Barang</h1>
        <hr className="border border-slate-800 w-2/5 m-auto" />
      </div>
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{data}</div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button onClick={handleDelete} className="button flex-1">
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalItem;
