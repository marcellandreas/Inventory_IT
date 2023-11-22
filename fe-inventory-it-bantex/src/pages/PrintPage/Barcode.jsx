import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { MdArrowCircleLeft, MdPrint } from "react-icons/md";
import { ContentLayout, MainLayout } from "../../components/templates";

function BarcodePrinter() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    AxiosInstance.get("/items").then((res) => {
      setData(res.data.data.map((item) => item.item_no));
      //  setIsLoading(false);
    });
  }, [isLoading]);

  const [componentRef, setComponentRef] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: "data-qr-code-items",
    // onAfterPrint: () => alert("Berhasil print dokument"),
  });

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const printBarcode = () => {
    window.print();
  };

  return (
    <MainLayout>
      <ContentLayout>
        <div className="col-span-1">
          <MdArrowCircleLeft onClick={backToMenu} size={32} className=" " />
        </div>
        <h1 className="text-center rounded-md bg-white text-xl   uppercase font-bold col-span-4 ">
          Cetak Barcode
        </h1>
        <div className=" col-span-1  place-self-end">
          <button onClick={handlePrint} className="button ">
            <MdPrint />
            Print
          </button>
        </div>

        <div
          className="flex col-span-6 w-full gap-4 justify-between flex-wrap bg-white p-4 rounded-xl shadow-xl "
          ref={(ref) => setComponentRef(ref)}
        >
          {data.map((barcode, index) => (
            <div key={index} className="border w-[250px]  border-slate-500">
              <Barcode
                value={barcode}
                width={1}
                height={40}
                format="CODE128"
                fontSize={15}
              />
            </div>
          ))}
        </div>
      </ContentLayout>
    </MainLayout>
  );
}

export default BarcodePrinter;
