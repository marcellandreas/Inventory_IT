import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";

function QrcodePrinter() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    AxiosInstance.get("/items").then((res) => {
      setData(res.data.data.map((item) => item.item_no));

      //  setIsLoading(false);
    });
  }, [isLoading]);

  const backToMenu = () => {
    navigate(-1);
  };

  const printBarcode = () => {
    window.print();
  };

  return (
    <section className="w-full">
      <div className="  m-10   flex flex-col gap-4 items-center">
        <button
          onClick={backToMenu}
          className="button absolute left-10 print:hidden"
        >
          Back
        </button>
        <h1 className="text-align text-2xl uppercase font-bold ">
          Cetak Qrcode
        </h1>
        <div className="flex w-full gap-4 flex-wrap">
          {data.map((qrcode, index) => (
            <div
              key={index}
              className="border w-44 flex items-center justify-center flex-col"
            >
              <QRCode value={qrcode} size={128} fgColor="#000" bgColor="#fff" />
              <p>{qrcode}</p>
            </div>
          ))}
        </div>
        <div className=" self-start">
          <button onClick={printBarcode} className="button print:hidden w-40">
            Cetak Qrcode
          </button>
        </div>
      </div>
    </section>
  );
}

export default QrcodePrinter;
