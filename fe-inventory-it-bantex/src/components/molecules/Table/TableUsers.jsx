import { MdEdit } from "react-icons/md";
import {
  columnTableItems,
  columnTableUsers,
} from "../../../assets/data/ColumnTables";
import { MdEditNote, MdDelete } from "../../../assets/icons/icons";
import { TableContent, Tbody, Thead } from "../../atoms";
import { ShowModal } from "../../organisms";
import FormAddModalUser from "../Form/Users/FormAddModalUser";
const TableUsers = ({
  data,
  setIsLoading,
  setId,
  setEditModal,
  setDeleteModal,
}) => {
  const role = localStorage.getItem("role");

  const tableHeaders =
    role == 1 || role == 3
      ? columnTableUsers
      : columnTableUsers.filter(
          (columnName) => !["PASSWORD"].includes(columnName)
        );

  return (
    <>
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
              <td className="border px-4 py-2">{user.code_user}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.password}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setEditModal(true);
                    setId(user.id_user);
                  }}
                  className="p-2 bg-blue-600 rounded-lg"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setId(user.id_user);
                  }}
                  className="p-2 bg-red-600 rounded-lg"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </Tbody>
      </TableContent>
    </>
  );
};

export default TableUsers;
