import React, { useState } from "react";
import ShowModal from "../../organisms/ShowModal";
import {
  FormAddModalUser,
  FormDeleteModalUser,
  FormEditModalUser,
} from "../../molecules";

const TableDataUsers = ({ users, setIsLoading }) => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  return (
    <>
      <section className="lg:w-[1100px] bg-slate-400 backdrop-blur-md">
        <section className="table__header">
          <h1>Tabel User</h1>
          <div className="input-group">
            <input
              onChange={(e) => {
                handleSearch(e);
              }}
              type="search"
              placeholder="Search Data..."
            />
          </div>
          <button
            className="button"
            onClick={() => {
              setAddModal(true);
            }}
          >
            Add User
          </button>
        </section>
        <section className="table__body">
          <Table
            data={users}
            setId={setId}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
          />
        </section>
      </section>
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalUser
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
      <ShowModal isVisible={editModal} onClose={() => setEditModal(false)}>
        <FormEditModalUser
          onClose={() => setEditModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <FormDeleteModalUser
          onClose={() => setDeleteModal(false)}
          setIsLoading={setIsLoading}
          id={id}
        />
      </ShowModal>
    </>
  );
};

const Table = ({ data, setEditModal, setDeleteModal, setId }) => {
  return (
    <>
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
          {data.map((user, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{user.code_user}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.password}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setEditModal(true);
                    setId(user.id_user);
                  }}
                  className="p-2 bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setId(user.id_user);
                  }}
                  className="p-2 bg-red-600 rounded-lg"
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

export default TableDataUsers;
