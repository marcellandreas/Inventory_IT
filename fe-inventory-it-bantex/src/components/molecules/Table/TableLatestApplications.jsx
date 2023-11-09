import { columnTableLatestReqSub } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TableLatestApplications = ({ data }) => {
  const role = localStorage.getItem("role");

  const tableHeaders =
    role == 1
      ? columnTableLatestReqSub
      : columnTableLatestReqSub.filter(
          (columnName) => !["action"].includes(columnName)
        );

  return (
    <div className=" h-[40vh]">
      <TableContent>
        <Thead>
          <tr>
            {tableHeaders.map((columnName, index) => (
              <th key={index} className="px-4 py-2 uppercase">
                {columnName}
              </th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {data.map((data, i) => (
            <tr key={i}>
              <td className="border px-4 py-2 font-semibold text-xl">
                {i + 1}
              </td>
              <td className="border px-4 py-2">{data.no_pengajuan}</td>
              <td className="border px-4 py-2">{data.name_pt}</td>
              <td className="border px-4 py-2">{data.name_division}</td>
              <td className="border px-4 py-2">{data.status}</td>
            </tr>
          ))}
        </Tbody>
      </TableContent>
    </div>
  );
};

export default TableLatestApplications;
