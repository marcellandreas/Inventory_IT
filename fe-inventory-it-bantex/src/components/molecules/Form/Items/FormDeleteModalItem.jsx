import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";

const FormDeleteModalItem = ({ onClose, id, setIsLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/items/${id}`).then((res) => {
      setData(res.data.data.map((item) => item.item_description));
    });
  }, [id]);
  const handleDelete = async () => {
    AxiosInstance.delete(`/items/${id}`)
      .then((res) => {
        alert("Berhasil di hapus");
        setIsLoading(true);
        onClose();
      })
      .catch((err) => {
        alert("gagal di hapus");
      });
  };
  return (
    <form className="form_modal">
      <h1 className="text-2xl text-center">Hapus Barang</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>

        <div className="delete_item_box">{data}</div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button onClick={handleDelete} className="button flex-1">
          Ya, Hapus Sekarang
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalItem;
