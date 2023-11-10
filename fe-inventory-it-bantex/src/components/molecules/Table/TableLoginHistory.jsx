import { columnTableLoginHistory } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TableLoginHistory = ({ data }) => {
  const tableHeaders = columnTableLoginHistory;

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
        {data.map((user, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">
              {user.login_time.slice(0, 10)} - {user.login_time.slice(11, 19)}
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableLoginHistory;
