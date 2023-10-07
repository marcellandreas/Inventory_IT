const TableStocks = ({
  setEditModalStock,
  setDeleteModalStock,
  data,
  setId,
}) => {
  const columnNames = [
    "ID",
    "Kode Barang",
    "Nama Barang",
    "Merek",
    "Tahun",
    "Jumlah",
    "Satuan",
    "Kondisi",
    "Berfungsi",
    "Action",
  ];
  const tableHeaders = columnNames.map((columnName, index) => (
    <th key={index} className="px-4 py-2">
      {columnName}
    </th>
  ));
  return (
    <table className="min-w-full backdrop-blur-md bg-opacity-50 overflow-x-auto">
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>
        {data.map((barang, i) => (
          <tr key={barang.id_stock}>
            <td className="border px-4 py-2">{i++}</td>
            <td className="border px-4 py-2">{barang.code_stock}</td>
            <td className="border px-4 py-2">{barang.name}</td>
            <td className="border px-4 py-2">{barang.brand}</td>
            <td className="border px-4 py-2">{barang.year}</td>
            <td className="border px-4 py-2">{barang.total}</td>
            <td className="border px-4 py-2">{barang.unit}</td>
            <td className="border px-4 py-2">{barang._condition}</td>
            <td className="border px-4 py-2">{barang._function}</td>
            <td className="flex gap-2">
              <button
                onClick={() => {
                  setEditModalStock(true);
                  setId(barang.id_stock);
                }}
                className="p-3 bg-blue-600 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteModalStock(true);
                  setId(barang.id_stock);
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
  );
};

export default TableStocks;
