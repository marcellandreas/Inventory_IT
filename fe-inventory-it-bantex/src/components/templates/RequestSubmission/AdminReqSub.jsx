import QRCode from "qrcode.react";
import { generateTableRows } from "../../../helpers/generateTableRows";
import { renderEmptyRows } from "../../../helpers/renderEmptyRows";
import { TableHeaderRow } from "../../../helpers/tableHeaderRow";

const BottomPengajuan = ({ userData, data, status }) => {
  const qrcode = "h-32 flex flex-col items-center justify-between";

  return (
    <div className="flex justify-around justify-self-end  ">
      <div className={`${qrcode}`}>
        <p>Pemohon</p>
        {status !== "Ditolak" ? (
          <QRCode
            value={`${data.post_username} - ${data.no_pengajuan}`}
            size={50}
            fgColor="#000"
            bgColor="#fff"
          />
        ) : null}
        <p className=" font-semibold">{userData.userFullName}</p>
      </div>
      <div className={`${qrcode}`}>
        <p>Diketahui</p>
        {status === "Disetujui1" ||
        status === "Disetujui2" ||
        status === "Selesai" ? (
          <QRCode
            value={`${data.approved_1} - ${data.date_approved_1}`}
            size={50}
            fgColor="#000"
            bgColor="#fff"
          />
        ) : null}
        <p className=" font-semibold">{userData.adminFullName}</p>
      </div>

      <div className={`${qrcode}`}>
        <p>DiSetujui</p>
        {status === "Disetujui2" || status === "Selesai" ? (
          <QRCode
            value={`${data.approved_2} - ${data.date_approved_2}`}
            size={50}
            fgColor="#000"
            bgColor="#fff"
          />
        ) : null}
        <p className=" font-semibold">{userData.managerFullName}</p>
      </div>
    </div>
  );
};

const AdminReqSub = ({ userData, data, status, id }) => {
  console.log(data);
  return (
    <section className="flex bg-white gap-3 flex-col border max-h-[500px] w-full  border-black p-2 overflow-x-auto rounded-md ">
      <div className=" font-semibold text-center">
        <h3 className=" text-xl">Form Penerimaan Barang IT </h3>
        <p className=" font-normal">Atas beban PT {data.name_pt} </p>
      </div>
      <div className=" font-semibold ">
        <p>No: {data.no_pengajuan} </p>
        <p>Tgl: {data.post_date.slice(0, 10)} </p>
        <p>Bagian: {data.name_division} </p>
      </div>
      <div className="flex flex-col justify-between gap-2  ">
        <table className=" bg-transparent border">
          <TableHeaderRow />
          {generateTableRows(data.submissionData)}
          {renderEmptyRows(data.submissionData)}
        </table>
        <BottomPengajuan data={data} status={status} userData={userData} />
      </div>
    </section>
  );
};

export default AdminReqSub;
