import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { MdLocalPrintshop } from "react-icons/md";
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
        <MdLocalPrintshop /> <span>PDF</span>
      </button>
      <button className="button ">
        <CSVLink data={PrintCSV} className=" flex items-center gap-1">
          <MdLocalPrintshop /> <span>CSV</span>
        </CSVLink>
      </button>
    </>
  );
};

export { Print };
