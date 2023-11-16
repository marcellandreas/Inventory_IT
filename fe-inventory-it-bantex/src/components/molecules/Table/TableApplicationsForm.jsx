import { columnTableItemsReq } from "../../../assets/data/ColumnTables";
import { NavLink } from "react-router-dom";
import { TableContent, Tbody, Thead } from "../../atoms";
import {
  MdDelete,
  MdEditNote,
  PiWarningOctagonLight,
} from "../../../assets/icons/icons";

const TableApplicationsForm = ({ data, setDeleteModal, setId }) => {
  const tableHeaders = columnTableItemsReq;

  return (
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
            <td className="border px-4 py-2 font-semibold text-xl">{i + 1}</td>
            <td className="border px-4 py-2">{data.no_pengajuan}</td>
            <td className={`border    `}>
              <p className={` text-center p-2 rounded-lg ${data.status}`}>
                {data.status}
              </p>
            </td>
            <td className="border px-4 py-2">{data.approved_1}</td>
            <td className="border px-4 py-2">{data.approved_2}</td>

            <td className="border px-4 py-2">
              <p className=" font-semibold capitalize">{data.post_username}</p>
              <p className=" whitespace-nowrap">
                {data.name_pt}, {data.name_division}
              </p>
              <p>
                Created: <span>{data.post_date.slice(0, 10)}</span>
              </p>
            </td>

            <td className="flex gap-2 justify-center items-center">
              <NavLink
                to={`/form-pengajuan/detail/${data.id_item_req}`}
                className="button flex gap-2 items-center w-8 h-8"
              >
                <span className=" text-amber-500 font-bold">
                  <PiWarningOctagonLight />
                </span>
              </NavLink>
              <button
                onClick={() => {
                  // setEditModalItem(true);
                  // setId(data.id);
                  alert("Halaman Edit Tidak Tersedia");
                }}
                className="button_edit"
              >
                <MdEditNote />
              </button>
              <button
                onClick={() => {
                  setDeleteModal(true);
                  setId(data.id_item_req);
                }}
                className="button_delete"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableApplicationsForm;
