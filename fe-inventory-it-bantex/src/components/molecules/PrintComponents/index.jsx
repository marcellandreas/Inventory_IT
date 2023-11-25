import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const Print = ({ titleDocument, PrintPDF, PrintCSV }) => {
  const [componentRef, setComponentRef] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: { titleDocument },
    // onAfterPrint: () => alert("Berhasil print dokument"),
  });
  return (
    <>
      <div
        className=" hidden print:block"
        ref={(ref) => setComponentRef(ref)}
        style={{ width: "100%" }}
      >
        {PrintPDF}
      </div>
      <button onClick={handlePrint} className="button">
        Print PDF
      </button>
      <button className="button ">
        <CSVLink data={PrintCSV}>Print CSV</CSVLink>
      </button>
    </>
  );
};

export { Print };
