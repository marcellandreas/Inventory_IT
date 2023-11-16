import { columnTableItems } from "../../../assets/data/ColumnTables";
import { MdEditNote, MdDelete } from "../../../assets/icons/icons";
import { TableContent, Tbody, Thead } from "../../atoms";
const TableItems = ({ setEditModal, setDeleteModal, data, setId }) => {
  const tableHeaders = columnTableItems;

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
        {data.map((item, i) => (
          <tr key={i} className=" w-full">
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
              {item.item_no}
            </td>
            <td className="border px-4 py-2 whitespace-nowrap">
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
            <td className="border px-4 py-2">{item.category}</td>
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
            <td className="border px-4 py-2">{item.note}</td>
            <td className="border px-4 py-2 whitespace-nowrap">
              <p>
                Tgl Regis: <span>{item.date_registation}</span>
              </p>
              <p>
                Tgl exp:
                <span>{item.date_expired ? item.date_expired : "-"}</span>
              </p>
            </td>
            <td className=" whitespace-nowrap ">
              <p className=" capitalize font-semibold">{item.post_username}</p>
              <p>date: {item.post_date.slice(0, 10)}</p>
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
