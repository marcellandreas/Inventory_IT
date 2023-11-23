import { columnTablePcLine } from "../../../assets/data/ColumnTables";
import { showFormattedDate } from "../../../helpers/showFormattedDate";
import { TableContent, Tbody, Thead } from "../../atoms";

const TablePcLine = ({ data }) => {
  const tableHeaders = columnTablePcLine;
  const styletd = "border px-4 py-2";
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
          <tr key={i} className="h-5 w-full capitalize">
            <td className={styletd}>{i + 1}</td>
            <td className={`${styletd} whitespace-nowrap`}>{pc.item_no}</td>
            <td className={`${styletd} whitespace-nowrap`}>
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

            <td className={styletd} style={{ maxWidth: "1000px" }}>
              {pc.note}
            </td>
            <td className={`${styletd} whitespace-nowrap`}>
              <p className=" flex flex-col font-semibold">
                Tgl Regis:
                <span className=" font-normal">
                  {pc.date_registation
                    ? showFormattedDate(pc.date_registation)
                    : "-"}
                </span>
              </p>
              <p className=" flex flex-col font-semibold">
                Tgl exp:
                <span className=" font-normal">
                  {pc.date_expired ? showFormattedDate(pc.date_expired) : "-"}
                </span>
              </p>
            </td>
            <td className={`${styletd} whitespace-nowrap`}>
              <p>User: {pc.post_username}</p>
              <p>
                Date: <span>{showFormattedDate(pc.post_date)}</span>
              </p>
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TablePcLine;
