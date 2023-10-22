import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { columnTablePcMaster } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";
const TablePcMasters = ({ setEditModal, setDeleteModal, data, setId }) => {
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  // const [idFromPcComponent, setIdFromPcComponent] = useState("");
  const [idMarcell, setIdMarcell] = useState("");

  localStorage.setItem("GetIdFromTable", idMarcell);

  const tableHeaders =
    role == 1
      ? columnTablePcMaster
      : columnTablePcMaster.filter(
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
          <tr
            key={i}
            onClick={() => {
              backToMenu();
              setIdMarcell(barang.pc_no);
            }}
          >
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2">{barang.pc_no}</td>
            <td className="border px-4 py-2">{barang.pc_description}</td>
            <td className="border px-4 py-2">{barang.unit}</td>
            <td className="border px-4 py-2">{barang.category}</td>
            <td className="border px-4 py-2">{barang.status}</td>
            <td className="border px-4 py-2">{barang.pc_location}</td>
            <td className="border px-4 py-2">{barang.note}</td>
            <td className="border px-4 py-2">
              {barang.date_registation.slice(0, 10)}
            </td>
            <td className="border px-4 py-2">{barang.date_expired}</td>
            <td className="border px-4 py-2">{barang.pc_specification}</td>

            {role == 1 ? (
              <>
                <td className="border px-4 py-2">
                  {barang.post_user_id}: {barang.post_username}
                </td>
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

export default TablePcMasters;
