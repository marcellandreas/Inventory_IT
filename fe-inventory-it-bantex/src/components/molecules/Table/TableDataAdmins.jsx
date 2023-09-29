const TableDataAdmins = () => {
  const data = [
    {
      id: 1,
      code_user: "Admin - 001",
      username: "aku",
      password: "aku",
    },
  ];
  return (
    <section className="container mx-auto mt-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">Tabel Admin</h1>
      </div>
      <hr />
      <table className="min-w-full backdrop-blur-md bg-opacity-50 overflow-x-auto  ">
        <thead className="bg-slate-400 text-left">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">CODE</th>
            <th className="px-4 py-2">USERNAME</th>
            <th className="px-4 py-2">PASSWORD</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((barang) => (
            <tr key={barang.id}>
              <td className="border px-4 py-2">{barang.id}</td>
              <td className="border px-4 py-2">{barang.code_user}</td>
              <td className="border px-4 py-2">{barang.username}</td>
              <td className="border px-4 py-2">{barang.password}</td>

              <aside className="flex gap-2">
                <button className="p-3 bg-blue-600 rounded-lg">Edit</button>
                <button className="p-3 bg-red-600 rounded-lg">Delete</button>
              </aside>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableDataAdmins;
