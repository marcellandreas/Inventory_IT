const TablePcMasters = ({
  setEditModalItem,
  setDeleteModalItem,
  data,
  setId,
}) => {
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
    "Bar codeeeeeeeeeeee",
  ];
  const tableHeaders = columnNames.map((columnName, index) => (
    <th key={index} className="px-4 py-2">
      {columnName}
    </th>
  ));
  return (
    <>
      <table className=" backdrop-blur-md bg-opacity-50 overflow-x-auto">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>
          {data.map((barang, i) => (
            <tr key={i}>
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
              <td className="border px-4 py-2">{barang.post_user_id}</td>
              <td className="border px-4 py-2">{barang.post_username}</td>
              <td className="border px-4 py-2">
                {barang.post_date.slice(0, 10)}
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setEditModalItem(true);
                    setId(barang.id_stock);
                  }}
                  className="p-3 bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModalItem(true);
                    setId(barang.id_stock);
                  }}
                  className="p-3 bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </td>
              <td className="border px-4 py-2 w-20">
                <img
                  src={`https://barcode.tec-it.com/barcode.ashx?data=${barang.pc_no}&code=Code39&width=200&height=60`}
                  alt={`Barcode ${barang.pc_no}`}
                  className="w-[320px] h-20 rounded-lg"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablePcMasters;
