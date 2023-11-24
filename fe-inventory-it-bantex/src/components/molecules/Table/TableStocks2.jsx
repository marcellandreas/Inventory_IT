import { useEffect, useState } from "react";
import { columnTableStock } from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockDetails } from "../../../Redux/Feature/detailStockslice";
import {
  MdDelete,
  MdEditNote,
  FaAngleDown,
  FaAngleRight,
  PiWarningOctagonLight,
} from "../../../assets/icons/icons";
import { Link, NavLink } from "react-router-dom";

const TableStocks2 = ({ setDeleteModal, data, setId }) => {
  const [selectedStockNo, setSelectedStockNo] = useState("");
  const dispatch = useDispatch();

  // Get Headers Table
  const tableHeaders = columnTableStock.map((columnName, index) => (
    <th key={index} className="px-4 py-2">
      {columnName}
    </th>
  ));

  const dataDetailStockNo = useSelector(
    (state) => state.detailStock.dataDetailStockNo
  );
  const isLoading = useSelector((state) => state.detailStock.isLoading);
  console.log(dataDetailStockNo);
  const handleStockNoClick = (stockNo) => {
    if (selectedStockNo === stockNo) {
      setSelectedStockNo(null);
    } else {
      setSelectedStockNo(stockNo);

      dispatch(fetchStockDetails(stockNo));
    }
  };

  console.log(data);

  useEffect(() => {}, [selectedStockNo, isLoading]);

  const ArrowIcon = ({ isOpen }) => (
    <div className="text-sm">{isOpen ? <FaAngleDown /> : <FaAngleRight />}</div>
  );
  return (
    <TableContent>
      <Thead>{tableHeaders}</Thead>
      <Tbody>
        {data?.map((stock, i) => (
          <>
            <tr key={stock.id_stock} className=" relative">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border whitespace-nowrap p-1">
                <div
                  className="flex gap-2 justify-center items-center"
                  onClick={() => handleStockNoClick(stock.stock_no)}
                >
                  <ArrowIcon isOpen={selectedStockNo === stock.stock_no} />
                  {stock.stock_no}
                </div>
              </td>
              <td className="border p-1 whitespace-nowrap">
                {stock.stock_description}
              </td>
              <td className="border px-4 py-2">{stock.stock_qty}</td>
              <td className="border px-4 py-2">{stock.category}</td>
              <td className="border px-4 py-2">{stock.unit}</td>
              <td className="border px-4 py-2">{stock.type}</td>
              <td className="border px-4 ">{stock.note}</td>
              <td className="border px-4 py-2 whitespace-nowrap">
                <p className=" font-semibold capitalize">
                  {stock.post_username}
                </p>
                <p>
                  {"date: "}
                  <span>{stock?.post_date?.slice(0, 10)}</span>
                </p>
              </td>

              <td className="flex gap-2">
                <NavLink
                  to={`detail/${stock.stock_no}`}
                  className="button text-amber-700"
                >
                  <PiWarningOctagonLight className=" text-amber-500 font-bold" />
                </NavLink>
                <NavLink to={`ubah/${stock.stock_no}`} className="button_edit">
                  <MdEditNote />
                </NavLink>
                <button
                  onClick={() => {
                    setDeleteModal(true);

                    setId(stock.id_stock);
                  }}
                  className="button_delete"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          </>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableStocks2;
