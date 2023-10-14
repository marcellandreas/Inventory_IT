import { useSelector } from "react-redux";
import { columnTableItemsReq } from "../../../assets/data/ColumnTables";
import { NavLink } from "react-router-dom";
import { TableContent, Tbody, Thead } from "../../atoms";
const TableApplicationsForm = () => {
  const role = localStorage.getItem("role");
  const dataReq = useSelector(
    (state) => state.dataPengajuanBarang.dataItemsReq
  );

  const tableHeaders =
    role == 1
      ? columnTableItemsReq
      : columnTableItemsReq.filter(
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
        {dataReq.map((data, i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{i + 1}</td>
            <td>
              <NavLink to={`detail`} className="button flex gap-2 items-center">
                <span>Detail</span>
              </NavLink>
            </td>
            <td className="border px-4 py-2">{data.no_pengajuan}</td>
            <td className="border px-4 py-2">{data.name_pt}</td>
            <td className="border px-4 py-2">{data.name_division}</td>
            <td className="border px-4 py-2">{data.item_req_date}</td>
            <td className="border px-4 py-2">{data.approved_1}</td>
            <td className="border px-4 py-2">{data.approved_2}</td>
            {role == 1 ? (
              <>
                <td className="border px-4 py-2">{data.post_user_id}</td>
                <td className="border px-4 py-2">{data.post_username}</td>
                <td className="border px-4 py-2">
                  {data.post_date.slice(0, 10)}
                </td>
              </>
            ) : role == 2 ? null : null}
            {/* <td className="flex gap-2">
              <button
                onClick={() => {
                  setEditModalItem(true);
                  setId(data.id);
                }}
                className="p-3 bg-blue-700 rounded-lg"
              >
                <MdEditNote />
              </button>
              <button
                onClick={() => {
                  setDeleteModalItem(true);
                  setId(data.id);
                }}
                className="p-3 bg-red-700 rounded-lg"
              >
                <MdDelete />
              </button>
            </td> */}
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableApplicationsForm;
