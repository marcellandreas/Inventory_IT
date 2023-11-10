import { CSVLink } from "react-csv";
import TableStocks from "../Table/TableStocks";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";

const DropdownPrint = ({ dataCsv, dataPdf }) => {
  const [componentRef, setComponentRef] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef,
    documentTitle: "data-stock",
    // onAfterPrint: () => alert("Berhasil print dokument"),
  });
  return (
    <div className="flex flex-col dropdown-print">
      <ul className="flex flex-col gap-1">
        <div ref={(ref) => setComponentRef(ref)} style={{ width: "100%" }}>
          <div className=" hidden print:block">
            <TableStocks data={dataPdf} />
          </div>
        </div>
        <button onClick={handlePrint} className="button">
          Print PDF
        </button>
        <button className="button ">
          <CSVLink data={dataCsv}>Print CSV</CSVLink>
        </button>
      </ul>
    </div>
  );
};

export default DropdownPrint;
