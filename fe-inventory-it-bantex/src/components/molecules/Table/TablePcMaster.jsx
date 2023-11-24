import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { columnTablePcMaster } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";
const TablePcMasters = ({ data }) => {
  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  const [idMarcell, setIdMarcell] = useState("");

  localStorage.setItem("GetIdFromTable", idMarcell);

  const tableHeaders = columnTablePcMaster;
  const styletd = "border px-4 py-2";
  return (
    <TableContent>
      <Thead>
        {tableHeaders.map((columnName, index) => (
          <th key={index} className="px-4 py-2">
            {columnName}
          </th>
        ))}
      </Thead>
      <Tbody>
        {data.map((pc, i) => (
          <tr
            key={i}
            onClick={() => {
              backToMenu();
              setIdMarcell(pc.pc_no);
            }}
          >
            <td className={styletd}>{i + 1}</td>
            <td className={`${styletd} whitespace-nowrap`}>{pc.pc_no}</td>
            <td className={`${styletd} whitespace-nowrap`}>
              {pc.pc_description}
            </td>
            <td className={styletd}>{pc.unit}</td>
            <td className={styletd}>{pc.category}</td>
            <td className={styletd}>{pc.status}</td>
            <td className={styletd}>{pc.pc_location}</td>
            <td className={styletd}>{pc.note}</td>
            <td className={`${styletd} whitespace-nowrap`}>
              <p>
                Tgl Regis: <span>{pc.date_registation.slice(0, 10)}</span>
              </p>
              <p>
                Tgl exp:{" "}
                <span>
                  {pc.date_expired ? pc.date_expired.slice(0, 10) : "-"}
                </span>
              </p>
            </td>
            <td className={styletd}>{pc.pc_specification}</td>
            <td className=" whitespace-nowrap ">
              <p className=" capitalize font-semibold">
                {pc.post_username ? pc.post_username : "undifined"}
              </p>
              <p>date: {pc.post_date.slice(0, 10)}</p>
            </td>
          </tr>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TablePcMasters;
