import { LayoutContentDashboard, Sidebar } from "../../components/templates";

const DetailFormItemsRequest = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex bg-white gap-3 flex-col border  border-black min-h-[500px] p-3 ">
          <div className=" font-semibold text-center">
            <h3 className=" text-xl">Form Pengajuan Barang IT </h3>
            <p className=" font-normal">Atas beban PT BMS </p>
          </div>
          <div className=" font-semibold ">
            <p>No: </p>
            <p>Tgl: </p>
            <p>Bagian: </p>
          </div>
          <table className=" bg-transparent border">
            <tr className="border py-0 m-0">
              <th className="border p-0 m-0 border-black">No</th>
              <th className="border p-0 m-0 border-black">Nama Barang</th>
              <th className="border p-0 m-0 border-black">QTY</th>
              <th className="border p-0 m-0 border-black">Keterangan</th>
            </tr>
            <tr className="border">
              <td className="border p-0 m-0 border-black">1</td>
              <td className="border p-0 m-0 border-black">1</td>
              <td className="border p-0 m-0 border-black">1</td>
              <td className="border p-0 m-0 border-black">1</td>
            </tr>
          </table>
          <div className="flex justify-around">
            <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
              <p>Pemohon</p>
              <p className=" font-semibold">Nama Jelas</p>
            </div>
            <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
              <p>Diketahui</p>
              <p className=" font-semibold">Nama Jelas</p>
            </div>
            <div className="h-44 bg-slate-200 flex flex-col items-center justify-between">
              <p>DiSetujui</p>
              <p className=" font-semibold">Nama Jelas</p>
            </div>
          </div>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default DetailFormItemsRequest;
