import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { TableStocks } from "../../components/molecules";

const ReactToPrint = () => {
  const [componentRef, setComponentRef] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Berhasil print dokument"),
  });

  return (
    <>
      <div ref={(ref) => setComponentRef(ref)} style={{ width: "100%" }}>
        <div className=" hidden print:block">
          <TableStocks data={data} />
        </div>
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default ReactToPrint;
