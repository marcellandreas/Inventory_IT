import { columnTableItemsReq } from "../../../assets/data/ColumnTables";
import { NavLink } from "react-router-dom";
import { TableContent, Tbody, Thead } from "../../atoms";
import {
  MdDelete,
  MdEditNote,
  PiWarningOctagonLight,
} from "../../../assets/icons/icons";

const TableNewApplications = ({ data, setDeleteModal, setId }) => {
  const tableHeaders = columnTableItemsReq;

  return (
    <TableContent>
      <Thead>
        {tableHeaders.map((columnName, index) => (
          <th key={index} className="px-4 py-2 uppercase">
            {columnName}
          </th>
        ))}
      </Thead>
      <Tbody>
        {data.map((data, i) => (
          <tr key={i}>
            <td className="border px-4 py-2 font-semibold text-xl">{i + 1}</td>

            <td>
              <NavLink
                to={`/form-pengajuan/detail/${data.id_item_req}`}
                className="button flex gap-2 items-center w-9 h-9"
              >
                <span className=" text-amber-500 font-bold">
                  <PiWarningOctagonLight />
                </span>
              </NavLink>
            </td>

            <td className="border px-4 py-2">{data.no_pengajuan}</td>
            <td className="border px-4 py-2">{data.name_pt}</td>
            <td className="border px-4 py-2">{data.name_division}</td>
            <td className={`border p-1   `}>
              <p className={` text-center p-2 rounded-lg ${data.status}`}>
                {data.status}
              </p>
            </td>
            <td className="border px-4 py-2">{data.approved_1}</td>
            <td className="border px-4 py-2">{data.approved_2}</td>
            {/* {role == 1 ? (
              <> */}
            <td className="border px-4 py-2">{data.post_username}</td>
            <td className="border px-4 py-2">{data.post_date.slice(0, 10)}</td>
            {/* </> */}
            {/* ) : null} */}
            <td className="flex gap-2">
              {/* <button
                  onClick={() => {
                    // setEditModalItem(true);
                    // setId(data.id);
                  }}
                  className="button_edit"
                >
                  <MdEditNote />
                </button> */}
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

export default TableNewApplications;
