import { GrCloudComputer } from "react-icons/gr";
const TablePcMasters = ({
  setEditModal,
  setDeleteModal,
  setComponents,
  data,
  setId,
}) => {
  const role = localStorage.getItem("role");
  const columnNames = [
    "id",
    "pc_no",
    "pc_description",
    "unit",
    "category",
    "status",
    "pc_location",
    "note",
    "date_registation",
    "date_expired",
    "pc_spectification",
    "post_user_id",
    "post_username",
    "post_date",
    "action",
  ];

  const tableHeaders =
    role == 1
      ? columnNames
      : columnNames.filter(
          (columnName) =>
            !["post_user_id", "post_username", "post_date"].includes(columnName)
        );
  return (
    <>
      <table className=" backdrop-blur-md bg-opacity-50 overflow-x-auto">
        <thead>
          <tr>
            {tableHeaders.map((columnName, index) => (
              <th key={index} className="px-4 py-2">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((barang, i) => (
            <tr
              key={i}
              onClick={() => {
                alert(`${barang.id_pc_master}`);
              }}
            >
              <td className="border px-4 py-2">{i++}</td>
              <td className="border px-4 py-2">{barang.pc_no}</td>
              <td className="border px-4 py-2">{barang.pc_description}</td>
              <td className="border px-4 py-2">{barang.unit}</td>
              <td className="border px-4 py-2">{barang.category}</td>
              <td className="border px-4 py-2">{barang.status}</td>
              <td className="border px-4 py-2">{barang.pc_location}</td>
              <td className="border px-4 py-2">{barang.note}</td>
              <td className="border px-4 py-2">{barang.date_registation}</td>
              <td className="border px-4 py-2">{barang.date_expired}</td>
              <td className="border px-4 py-2">{barang.pc_specification}</td>

              {role == 1 ? (
                <>
                  <td className="border px-4 py-2">{barang.post_user_id}</td>
                  <td className="border px-4 py-2">{barang.post_username}</td>
                  <td className="border px-4 py-2">
                    {barang.post_date.slice(0, 10)}
                  </td>
                </>
              ) : role == 2 ? null : null}
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setEditModal(true);
                    setId(barang.id_pc_master);
                  }}
                  className="p-3 bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setId(barang.id_pc_master);
                  }}
                  className="p-3 bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablePcMasters;
