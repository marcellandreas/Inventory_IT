import { columnTablePcLine } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TablePcLine = ({ setEditModal, setDeleteModal, data, setId }) => {
  const role = localStorage.getItem("role");

  const tableHeaders =
    role == 1
      ? columnTablePcLine
      : columnTablePcLine.filter(
          (columnName) =>
            !["post_user_id", "post_username", "post_date"].includes(columnName)
        );
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
        {data.map((barang, i) => (
          <tr key={i} className="h-5">
            <td className="border px-4 py-2">{i++}</td>
            <td className="border px-4 py-2">{barang.item_no}</td>
            <td className="border px-4 py-2">{barang.item_description}</td>
            <td className="border px-4 py-2">{barang.unit}</td>
            <td className="border px-4 py-2">{barang.brand}</td>
            <td className="border px-4 py-2 ">{barang.note}</td>
            <td className="border px-4 py-2">{barang.date_registation}</td>
            <td className="border px-4 py-2">{barang.item_specification}</td>

            {role == 1 ? (
              <>
                <td className="border px-4 py-2">{barang.post_username}</td>
                <td className="border px-4 py-2">
                  {barang.post_date.slice(0, 10)}
                </td>
              </>
            ) : role == 2 ? null : null}
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TablePcLine;
