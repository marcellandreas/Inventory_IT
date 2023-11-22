import React from "react";
import QRCode from "qrcode.react";
import { generateTableRows } from "../../../helpers/generateTableRows";
import { renderEmptyRows } from "../../../helpers/renderEmptyRows";
import { TableHeaderRow } from "../../../helpers/tableHeaderRow";

const UserReqSub = ({ data, id, status }) => {
  const renderQRCode = (value, size) => (
    <QRCode value={value} size={size} fgColor="#000" bgColor="#fff" />
  );

  const renderUserInfo = (label, username, qrValue, qrSize) => (
    <div className="h-32 flex flex-col items-center justify-between">
      <p>{label}</p>
      {status !== "Ditolak" ? renderQRCode(qrValue, qrSize) : null}
      <p className="font-semibold">{username}</p>
    </div>
  );

  return (
    <section className="flex bg-white gap-3 flex-col border max-h-[500px] w-full border-black p-2 overflow-x-auto">
      <div className="font-semibold text-center">
        <h3 className="text-xl">Form Pengajuan Barang IT {id}</h3>
        <p className="font-normal">Atas beban PT {data.name_pt} </p>
      </div>
      <div className="font-semibold">
        <p>No: {data.no_pengajuan} </p>
        <p>Tgl: {data.post_date.slice(0, 10)} </p>
        <p>Bagian: {data.name_division} </p>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <table className="bg-transparent border">
          <TableHeaderRow />
          {generateTableRows(data.submissionData)}
          {renderEmptyRows(data.submissionData)}
        </table>

        <div className="flex justify-around justify-self-end">
          {renderUserInfo(
            "Pemohon",
            data.post_username,
            `${data.post_username} - ${data.no_pengajuan}`,
            50
          )}
          {renderUserInfo(
            "Diketahui",
            data.approved_1,
            `${data.approved_1} - ${data.date_approved_1}`,
            50
          )}
          {renderUserInfo(
            "DiSetujui",
            data.approved_2,
            `${data.approved_2} - ${data.date_approved_2}`,
            50
          )}
        </div>
      </div>
    </section>
  );
};

export default UserReqSub;
