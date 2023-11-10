import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import image from "../../../../assets/images/header.png";

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
      <h1 className=" text-lg font-bold text-center">Hapus Akun Admin</h1>
      <hr className="border border-slate-800 w-full m-auto" />
      <section className="flex flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus User</p>
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

export default FormDeleteModalUser;
{
  /* <div className=" bg-gray-100 h-[10vh] relative">
        <img src={image} className="h-full" alt="" />
        <p className="absolute top-1/2 left-1/2 transform translate-[-10%, -50%] text-white text-xl">
          Hapus
        </p>
      </div> */
}
