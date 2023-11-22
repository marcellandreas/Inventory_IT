import { useState } from "react";
import { BsDatabaseFillAdd } from "../../../assets/icons/icons";
import ShowModal from "../../organisms/Show/ShowModals";
import FormAddModalItem from "../Form/Items/FormAddModalItem";
import { NavLink } from "react-router-dom";
import { columnTablePcLineAdd } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";

const TablePcLineAdd = ({ data, handleGetItemNo, clickedItems }) => {
  const role = localStorage.getItem("role");
  const [addModalItem, setAddModalItem] = useState(false);
  const [isIsLoading, setIsLoading] = useState(true);

  const tableHeaders = columnTablePcLineAdd;

  // POST METHOD

  return (
    <>
      {data.length === 0 ? (
        <div className="h-10 flex items-center justify-center">
          <NavLink to={`/items`} className="button">
            Tambah Barang
          </NavLink>
        </div>
      ) : (
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
            {data.map((pc, i) => (
              <tr key={i} className="h-5">
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleGetItemNo(pc.item_no)}
                    className="button"
                    disabled={clickedItems.includes(pc.item_no)}
                  >
                    <BsDatabaseFillAdd />
                  </button>
                </td>
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2  whitespace-nowrap">
                  {pc.item_no}
                </td>
                <td className="border px-4 py-2 whitespace-nowrap">
                  <p className=" font-semibold">{pc.item_description}</p>
                  <p>
                    brand: <span>{pc.brand}</span>
                  </p>
                  <p>
                    Satuan: <span>{pc.unit}</span>
                  </p>
                  <p>
                    Spesifikasi: <span>{pc.item_specification}</span>
                  </p>
                </td>
                <td className="border px-4 py-2">{pc.unit}</td>
                <td className="border px-4 py-2">{pc.brand}</td>
                <td className="border px-4 py-2 ">{pc.note}</td>
                <td className="border px-4 py-2 whitespace-nowrap">
                  <p>
                    Tgl Regis: <span>{pc.date_registation}</span>
                  </p>
                  <p>
                    Tgl exp:{" "}
                    <span>{pc.date_expired ? pc.date_expired : "-"}</span>
                  </p>
                </td>
              </tr>
            ))}
          </Tbody>
        </TableContent>
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
