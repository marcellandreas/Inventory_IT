import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ContentLayout, MainLayout } from "../../components/templates";
import { MdArrowCircleLeft, MdArrowLeft, MdPrint } from "react-icons/md";
import { BackButton } from "../../components/atoms";

function QrcodePrinter() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [componentRef, setComponentRef] = useState(null);

  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    AxiosInstance.get("/items").then((res) => {
      setData(res.data.data.map((item) => item.item_no));

      setIsLoading(false);
    });
  }, [isLoading]);

  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: "data-qr-code-items",
    // onAfterPrint: () => alert("Berhasil print dokument"),
  });

  const backToMenu = () => {
    navigate(-1);
  };

  const printBarcode = () => {
    window.print();
  };

  return (
    <MainLayout>
      <ContentLayout>
        <BackButton onClick={backToMenu} className=" col-span-1 w-28" />

        <h1 className="text-center rounded-md bg-white text-xl  uppercase font-bold col-span-4 ">
          Cetak Barcode
        </h1>
        <div className=" col-span-1  place-self-end">
          <button onClick={handlePrint} className="button ">
            <MdPrint />
            Print
          </button>
        </div>
        <div
          className="flex w-full gap-4 flex-wrap col-span-6 bg-white px-2 py-5 rounded-xl shadow-xl"
          ref={(ref) => setComponentRef(ref)}
        >
          {data.map((qrcode, index) => (
            <div
              key={index}
              className="border w-40 flex items-center justify-center flex-col py-3"
            >
              <QRCode value={qrcode} size={100} fgColor="#000" bgColor="#fff" />
              <p>{qrcode}</p>
            </div>
          ))}
        </div>
      </ContentLayout>
    </MainLayout>
  );
}

export default QrcodePrinter;
