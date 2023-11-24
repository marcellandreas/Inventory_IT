import { columnTableItems } from "../../../assets/data/ColumnTables";
import { MdEditNote, MdDelete } from "../../../assets/icons/icons";
import { showFormattedDate } from "../../../helpers/showFormattedDate";
import { TableContent, Tbody, Thead } from "../../atoms";
const TableItems = ({ setEditModal, setDeleteModal, data, setId }) => {
  const tableHeaders = columnTableItems;
  const styletd = "border px-4 py-2";

  return (
    <TableContent>
      <Thead>
        {tableHeaders.map((columnName, index) => (
          <th key={index} className={`${styletd} text-slate-700`}>
            {columnName}
          </th>
        ))}
      </Thead>
      <Tbody>
        {data.map((item, i) => (
          <tr key={i} className=" w-full">
            <td className={styletd}>{i + 1}</td>
            <td className={`${styletd} whitespace-nowrap`}>{item.item_no}</td>
            <td className={`${styletd} whitespace-nowrap`}>
              <p className=" font-semibold">{item.item_description}</p>
              <p>
                brand: <span>{item.brand}</span>
              </p>
              <p>
                Satuan: <span>{item.unit}</span>
              </p>
              <p>
                Spesifikasi: <span>{item.item_specification}</span>
              </p>
            </td>
            <td className={styletd}>{item.category}</td>
            <td className=" whitespace-nowrap">
              <div className=" flex  items-center gap-1">
                <p>Status: </p>
                <p className={` text-center p-2 rounded-lg ${item.status}`}>
                  {item.status}
                </p>
              </div>
              <p>
                Kondisi: <span>{item.kondisi}</span>
              </p>
              <p>
                Lokasi: <span>{item.item_location}</span>
              </p>
            </td>
            <td className={`${styletd} whitespace-wrap `}>{item.note}</td>
            <td className={`${styletd} whitespace-nowrap`}>
              <p className="flex flex-col font-semibold">
                Tgl Regis:
                <span className=" font-normal">
                  {/* {showFormattedDate(item.date_registation)} */}
                </span>
                <span>
                  {item.date_registation
                    ? showFormattedDate(item.date_registation)
                    : "-"}
                </span>
              </p>
              <p className="flex flex-col font-semibold">
                Tgl exp:
                <span className=" font-normal">
                  {item.date_expired ? item.date_expired : "-"}
                </span>
              </p>
            </td>
            <td className=" whitespace-nowrap ">
              <p className=" capitalize font-semibold">
                user: <span>{item.post_username}</span>
              </p>
              <p className=" flex flex-col">
                date:
                <span>
                  {item.post_date ? showFormattedDate(item.post_date) : "-"}
                </span>
              </p>
            </td>
            <td className=" px-4 py-2 ">
              <div className=" flex gap-1 items-center">
                <button
                  onClick={() => {
                    setEditModal(true);
                    setId(item.id);
                  }}
                  className="button_edit"
                >
                  <MdEditNote />
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setId(item.id);
                  }}
                  className="button_delete"
                >
                  <MdDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableItems;
