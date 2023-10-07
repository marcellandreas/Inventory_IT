import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";

const FormDeleteModalUser = ({ onClose, id, setIsLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/users/${id}`).then((res) => {
      setData(res.data.data.map((item) => item.username));
    });
  }, [id]);
  const handleDelete = async () => {
    AxiosInstance.delete(`/users/${id}`)
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
      <h1 className="text-2xl text-center">Hapus Delete</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus User</p>

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
          Back
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalUser;
