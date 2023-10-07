import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { AxiosInstance } from "../../apis/api";
import { useNavigate } from "react-router-dom";

function BarcodePrinter() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    AxiosInstance.get("/items").then((res) => {
      setData(res.data.data.map((item) => item.item_no));
      //  setIsLoading(false);
    });
  }, [isLoading]);

  const navigate = useNavigate();
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
          Cetak Barcode
        </h1>
        <div className="flex w-full gap-4 flex-wrap">
          {data.map((barcode, index) => (
            <div key={index} className="border w-[268px]">
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
        <div className=" self-start">
          <button onClick={printBarcode} className="button print:hidden w-40">
            Cetak Barcode
          </button>
        </div>
      </div>
    </section>
  );
}

export default BarcodePrinter;
