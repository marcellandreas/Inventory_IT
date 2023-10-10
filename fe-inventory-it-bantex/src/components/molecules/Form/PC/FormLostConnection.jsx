import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";

const FormLostConnection = ({ onClose, setIsLoading, pcInput }) => {
  const [dataPcComponent, setDataPcComponent] = useState([]);
  const [itemNo, setItemNo] = useState("");

  useEffect(() => {
    AxiosInstance.get(`pcline/${pcInput}`).then((res) => {
      setDataPcComponent(res.data.data);
    });
  }, [pcInput]);

  const options = [
    <option key={0} value="" disabled selected>
      Pilih item no
    </option>,
    ...dataPcComponent.map((stock, i) => (
      <option key={stock.item_no} defaultValue={stock.item_no}>
        {stock.item_no}
      </option>
    )),
  ];

  const handleDelete = async () => {
    AxiosInstance.delete(`/pcline/${itemNo}`)
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
      <h1 className="text-2xl text-center">Putuskan Koneksi</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <section className="flex flex-col items-center gap-2 w-full justify-center">
        {/* <p>Anda yakin ingin membuang komponet dari Pc Master</p>
         <div className="delete_item_box">a</div> */}
        <div className="gap-2 flex flex-col w-60">
          <label>Pc Number</label>
          <input
            className=" bg-slate-200 uppercase"
            type="text"
            name="pc_no"
            value={pcInput}
            readOnly
          />
        </div>
        <div className="gap-2 flex flex-col w-60">
          <label className="min-w-[140px]">Items Number</label>
          <div className="flex justify-end items-end gap-2">
            <select
              className="w-full bg-gray-200 rounded-md shadow-sm h-8"
              onChange={(e) => setItemNo(e.target.value)}
              name="item_no"
            >
              {options}
            </select>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button onClick={handleDelete} className="button flex-1">
          Ya, Putuskan Sekarang
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

export default FormLostConnection;
