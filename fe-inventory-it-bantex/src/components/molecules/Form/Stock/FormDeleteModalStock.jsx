import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockById } from "../../../../Redux/Feature/StockSlice";
import { AxiosInstance } from "../../../../apis/api";
import { TitleForm } from "../../../atoms";

const FormDeleteModalStock = ({ onClose, id }) => {
  const dataStockById = useSelector((state) => state.stocks.dataStockById);
  const dispatch = useDispatch();
  const [datas, setDatas] = useState("");
  useEffect(() => {
    dispatch(fetchStockById(id))
      .then(() => {
        console.log("Data stock by ID berhasil diambil");
      })
      .catch((err) => {
        console.error("Error fetching stock by ID:", err);
      });
  }, [dispatch, id]);
  useEffect(() => {
    // Reset formValues when dataStockById changes
    if (dataStockById) {
      setDatas(dataStockById.stock_description);
    }
  }, [dataStockById, id]);

  const handleDelete = () => {
    AxiosInstance.delete(`stocks/${id}`)
      .then(() => {
        alert("Berhasil Menghapus stok");
        onClose();
      })
      .catch(() => {
        alert("Gagal Menghapus stok");
      });
  };
  return (
    <form className="w-[450px] bg-amber-500 p-4 rounded-xl flex flex-col gap-3">
      <TitleForm>Hapus Stock</TitleForm>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{datas}</div>
      </section>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button className="button flex-1" onClick={handleDelete}>
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalStock;
