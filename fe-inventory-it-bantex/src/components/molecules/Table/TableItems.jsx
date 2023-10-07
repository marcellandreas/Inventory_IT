const TableItems = ({ setEditModalItem, setDeleteModalItem, data, setId }) => {
  const role = localStorage.getItem("role");

  const columnNames = [
    "id",
    "item_no",
    "item_description",
    "unit",
    "category",
    "brand",
    "status",
    "kondisi",
    "item_location",
    "note",
    "date_registation",
    "date_expired",
    "item_specification",
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
            <tr key={i}>
              <td className="border px-4 py-2">{i++}</td>
              <td className="border px-4 py-2">{barang.item_no}</td>
              <td className="border px-4 py-2">{barang.item_description}</td>
              <td className="border px-4 py-2">{barang.unit}</td>
              <td className="border px-4 py-2">{barang.category}</td>
              <td className="border px-4 py-2">{barang.brand}</td>
              <td className={`border px-4 py-2 `}>
                <p className={`status ${barang.status}`}>{barang.status}</p>
              </td>
              <td className="border px-4 py-2">{barang.kondisi}</td>
              <td className="border px-4 py-2">{barang.item_location}</td>
              <td className="border px-4 py-2">{barang.note}</td>
              <td className="border px-4 py-2">{barang.date_registation}</td>
              <td className="border px-4 py-2">{barang.date_expired}</td>
              <td className="border px-4 py-2">{barang.item_specification}</td>
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
                    setEditModalItem(true);
                    setId(barang.id);
                  }}
                  className="p-3 bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModalItem(true);
                    setId(barang.id);
                  }}
                  className="p-3 bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </td>
              {/* <td className="border px-4 py-2 w-20">
                <img
                  src={`https://barcode.tec-it.com/barcode.ashx?data=${barang.item_no}&code=Code39&width=200&height=60`}
                  alt={`Barcode ${barang.item_no}`}
                  className="w-[320px] h-20 rounded-lg"
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableItems;
