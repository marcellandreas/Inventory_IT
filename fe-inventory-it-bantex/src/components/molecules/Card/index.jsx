import QRCode from "qrcode.react";
import { showFormattedDate } from "../../../helpers";

export const CardStatusPengajuanUser = ({
  status,
  fullName,
  postDate,
  approval,
}) => {
  const qrcode = "h-32 flex flex-col items-center justify-between";
  return (
    <div className={`${qrcode}`}>
      <p>Pemohon</p>
      {status !== "Ditolak" ? (
        <QRCode
          value={`${fullName} - ${postDate}`}
          size={60}
          fgColor="#000"
          bgColor="#fff"
        />
      ) : null}
      <div className=" text-center">
        <p className=" font-semibold">{fullName}</p>
        <p className=" font-semibold">{approval}</p>
        <p className="font-semibold">
          {postDate ? showFormattedDate(postDate) : "-"}
        </p>
      </div>
    </div>
  );
};

export const CardStatusPengajuanAdmin = ({
  status,
  fullName,
  postDate,
  approval,
}) => {
  const qrcode = "h-32 flex flex-col items-center justify-between";

  return (
    <div className={`${qrcode}`}>
      <p>Diketahui</p>
      {status === "Disetujui1" ||
      status === "Disetujui2" ||
      status === "Selesai" ? (
        <QRCode
          value={`${fullName} - ${postDate}`}
          size={60}
          fgColor="#000"
          bgColor="#fff"
        />
      ) : null}
      <div className=" text-center">
        <p className=" font-semibold">{fullName}</p>
        <p className=" font-semibold">{approval}</p>
        <p className="font-semibold">
          {postDate ? showFormattedDate(postDate) : "-"}
        </p>
      </div>
    </div>
  );
};

export const CardStatusPengajuanManager = ({
  status,
  fullName,
  postDate,
  approval,
}) => {
  return (
    <div className={`h-32 flex flex-col items-center justify-between`}>
      <p>DiSetujui</p>
      {status === "Disetujui2" || status === "Selesai" ? (
        <QRCode
          value={`${fullName} - ${postDate}`}
          size={50}
          fgColor="#000"
          bgColor="#fff"
        />
      ) : null}
      <div className=" text-center">
        <p className=" font-semibold">{fullName}</p>
        <p className=" font-semibold">{approval}</p>
        <p className="">{postDate ? showFormattedDate(postDate) : "-"}</p>
      </div>
    </div>
  );
};
