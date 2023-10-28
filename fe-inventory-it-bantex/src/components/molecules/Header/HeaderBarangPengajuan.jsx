import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

const HeaderBarangPengajuan = ({ handleaddclick, label }) => {
  return (
    <div className="flex justify-between items-end">
      <h3 className="text-lg font-semibold">{label}</h3>
      <button className="button" onClick={handleaddclick}>
        <MdAddCircleOutline />
        <span className="hidden md:block">Tambah Barang</span>
      </button>
    </div>
  );
};

export default HeaderBarangPengajuan;
