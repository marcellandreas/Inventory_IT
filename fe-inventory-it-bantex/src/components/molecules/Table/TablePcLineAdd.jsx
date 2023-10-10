import { useState } from "react";
import { BsDatabaseFillAdd } from "../../../assets/icons/icons";
import ShowModal from "../../organisms/ShowModal";
import FormAddModalItem from "../Form/Items/FormAddModalItem";
import { NavLink } from "react-router-dom";

const TablePcLineAdd = ({ data, handleGetItemNo, clickedItems }) => {
  const role = localStorage.getItem("role");
  const [addModalItem, setAddModalItem] = useState(false);
  const [isIsLoading, setIsLoading] = useState(true);

  const columnNames = [
    "",
    "id",
    "item_no",
    "item_description",
    "unit",
    "brand",
    "note",
    "date_registation",
    "item_specification",
    "post_user_id",
    "post_username",
    "post_date",
  ];
  const tableHeaders =
    role == 1
      ? columnNames
      : columnNames.filter(
          (columnName) =>
            !["post_user_id", "post_username", "post_date"].includes(columnName)
        );

  // POST METHOD

  return (
    <>
      {data.length === 0 ? (
        <div className="h-10 flex items-center justify-center">
          <NavLink
            to={`/items`}
            // onClick={() => {
            //   setAddModalItem(true);
            // }}
            className="button"
          >
            Tambah Barang
          </NavLink>
        </div>
      ) : (
        <table className=" backdrop-blur-md bg-opacity-50 overflow-x-auto rounded-3xl">
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
              <tr key={i} className="h-5">
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleGetItemNo(barang.item_no)}
                    className="button"
                    disabled={clickedItems.includes(barang.item_no)}
                  >
                    <BsDatabaseFillAdd />
                  </button>
                </td>
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{barang.item_no}</td>
                <td className="border px-4 py-2">{barang.item_description}</td>
                <td className="border px-4 py-2">{barang.unit}</td>
                <td className="border px-4 py-2">{barang.brand}</td>
                <td className="border px-4 py-2 ">{barang.note}</td>
                <td className="border px-4 py-2">{barang.date_registation}</td>
                <td className="border px-4 py-2">
                  {barang.item_specification}
                </td>

                {role == 1 ? (
                  <>
                    <td className="border px-4 py-2">{barang.post_user_id}</td>
                    <td className="border px-4 py-2">{barang.post_username}</td>
                    <td className="border px-4 py-2">
                      {barang.post_date.slice(0, 10)}
                    </td>
                  </>
                ) : role == 2 ? null : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ShowModal
        isVisible={addModalItem}
        onClose={() => setAddModalItem(false)}
      >
        <FormAddModalItem
          onClose={() => setAddModalItem(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
    </>
  );
};

export default TablePcLineAdd;
