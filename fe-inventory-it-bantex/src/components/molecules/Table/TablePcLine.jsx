import { columnTablePcLine } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TablePcLine = ({ data }) => {
  const tableHeaders = columnTablePcLine;

  return (
    <TableContent>
      <Thead>
        <tr>
          {tableHeaders.map((columnName, index) => (
            <th key={index} className="px-4 py-2">
              {columnName}
            </th>
          ))}
        </tr>
      </Thead>
      <Tbody>
        {data.map((pc, i) => (
          <tr key={i} className="h-5 w-full">
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2 whitespace-nowrap">{pc.item_no}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <p className=" font-semibold">{pc.item_description}</p>
              <p>
                brand: <span>{pc.brand}</span>
              </p>
              <p>
                Satuan: <span>{pc.unit}</span>
              </p>
              <p>
                Spesifikasi: <span>{pc.item_specification}</span>
              </p>
            </td>

            <td className="border px-4 py-2" style={{ maxWidth: "1000px" }}>
              {pc.note}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <p>
                Tgl Regis: <span>{pc.date_registation.slice(0, 10)}</span>
              </p>
              <p>
                Tgl exp:{" "}
                <span>
                  {pc.date_expired ? pc.date_expired.slice(0, 10) : "-"}
                </span>
              </p>
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <p>{pc.post_username}</p>
              <p>
                date: <span>{pc.post_date.slice(0, 10)}</span>
              </p>
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TablePcLine;
