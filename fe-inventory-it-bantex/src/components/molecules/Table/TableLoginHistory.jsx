import { columnTableLoginHistory } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TableLoginHistory = ({ data }) => {
  const tableHeaders = columnTableLoginHistory;
  const styletd = "border px-4 py-2";
  return (
    <TableContent>
      <Thead>
        {tableHeaders.map((columnName, index) => (
          <th key={index + 1} className={styletd}>
            {columnName}
          </th>
        ))}
      </Thead>
      <Tbody>
        {data.map((user, i) => (
          <tr key={i}>
            <td className={styletd}>{i + 1}</td>
            <td className={styletd}>{user.username}</td>
            <td className={styletd}>
              {user.login_time.slice(0, 10)} - {user.login_time.slice(11, 19)}
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableLoginHistory;
