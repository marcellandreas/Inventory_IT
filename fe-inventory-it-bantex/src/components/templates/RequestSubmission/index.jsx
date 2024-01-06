import React from "react";
import { generateTableRows } from "../../../helpers/generateTableRows";
import { renderEmptyRows } from "../../../helpers/renderEmptyRows";
import { TableHeaderRow } from "../../../helpers/tableHeaderRow";
import {
  CardStatusPengajuanAdmin,
  CardStatusPengajuanManager,
  CardStatusPengajuanUser,
} from "../../molecules/Card";

const FormPengajuan = ({
  data,
  id,
  status,
  adminFullName,
  managerFullName,
  userFullName,
}) => {
  return (
    <section className="flex bg-white gap-3 flex-col border max-h-[500px] w-full border-black p-2 overflow-x-auto">
      <div className="font-semibold text-center">
        <h3 className="text-xl">Form Pengajuan Barang IT</h3>
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
          <CardStatusPengajuanUser
            fullName={userFullName}
            postDate={data.post_date}
            approval={"Nama Jelas"}
            status={status}
          />

          <CardStatusPengajuanAdmin
            status={status}
            fullName={adminFullName}
            approval={"Bag It"}
            postDate={data.date_approved_1}
          />

          <CardStatusPengajuanManager
            status={status}
            fullName={managerFullName}
            approval={"Manager"}
            postDate={data.date_approved_2}
          />
        </div>
      </div>
    </section>
  );
};

export default FormPengajuan;
