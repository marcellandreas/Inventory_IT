import React from "react";

const TableDataAdmins = () => {
  const data = [
    {
      id: 1,
      code_user: "USER - 001",
      username: "user",
      password: "user",
      email: "user@gmail.com",
    },
  ];
  return (
    <section className="container mx-auto mt-5 flex flex-col gap-5">
      <div className="flex justify-between items-center h-10">
        <h1 className="text-2xl font-semibold mb-4">Table Users</h1>
        <AddUserButton />
      </div>
      <hr />
      <Table data={data} />
    </section>
  );
};

const AddUserButton = () => {
  return (
    <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700">
      Add User
    </button>
  );
};

const Table = ({ data }) => {
  return (
    <table className="min-w-full backdrop-blur-md bg-opacity-50 overflow-x-auto">
      <thead className="bg-slate-400 text-left">
        <tr>
          <th className="px-4 py-2 uppercase">ID</th>
          <th className="px-4 py-2 uppercase">CODE</th>
          <th className="px-4 py-2 uppercase">USERNAME</th>
          <th className="px-4 py-2 uppercase">PASSWORD</th>
          <th className="px-4 py-2 uppercase">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((barang) => (
          <tr key={barang.id}>
            <td className="border px-4 py-2">{barang.id}</td>
            <td className="border px-4 py-2">{barang.code_user}</td>
            <td className="border px-4 py-2">{barang.username}</td>
            <td className="border px-4 py-2">{barang.password}</td>
            <td className="flex gap-2">
              <button className="p-2 bg-blue-600 rounded-lg">Edit</button>
              <button className="p-2 bg-red-600 rounded-lg">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDataAdmins;
