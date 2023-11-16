import { useEffect, useState } from "react";
import {
  columnTableStock,
  columnTableStockDetail,
} from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockDetails } from "../../../Redux/Feature/detailStockslice";
import { MdDelete, MdEditNote } from "react-icons/md";
import { NavLink } from "react-router-dom";

const TableStocks = ({ setDeleteModal, data, setId }) => {
  const [selectedStockNo, setSelectedStockNo] = useState("");
  const dispatch = useDispatch();

  // Get Headers Table
  const tableHeaders = columnTableStock.map((columnName, index) => (
    <th key={index} className="px-4 py-2">
      {columnName}
    </th>
  ));
  const tableHeadersDetail = columnTableStockDetail.map((columnName, index) => (
    <th key={index} className="px-4 py-2">
      {columnName}
    </th>
  ));

  const dataDetailStockNo = useSelector(
    (state) => state.detailStock.dataDetailStockNo
  );
  const isLoading = useSelector((state) => state.detailStock.isLoading);

  const handleStockNoClick = (stockNo) => {
    if (selectedStockNo === stockNo) {
      setSelectedStockNo(null);
    } else {
      setSelectedStockNo(stockNo);

      dispatch(fetchStockDetails(stockNo));
    }
  };

  useEffect(() => {}, [selectedStockNo, isLoading]);

  const ArrowIcon = ({ isOpen }) => (
    <div className="text-sm">{isOpen ? <FaAngleDown /> : <FaAngleRight />}</div>
  );
  return (
    <TableContent>
      <Thead>
        <tr>{tableHeaders}</tr>
      </Thead>
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
            {selectedStockNo === stock.stock_no && (
              <td colSpan={12} className="bg-blue-300 -z-50 px-0 py-2 m-0">
                <td
                  colSpan={6}
                  className="relative z-30"
                  key={`dropdown-${stock.id_stock}`}
                >
                  {dataDetailStockNo.length === 0 ? (
                    <p className="text-center">DaTa Tidak Ada</p>
                  ) : (
                    <TableContent>
                      <Thead>
                        <tr>{tableHeadersDetail}</tr>
                      </Thead>
                      <Tbody>
                        {dataDetailStockNo?.map((dataDetail, i) => (
                          <tr key={i}>
                            <td className="border px-4 py-2">{i + 1}</td>
                            <td className="border px-4 py-2">
                              {dataDetail.stock_detail_description}
                            </td>
                            <td className="border px-4 py-2">
                              {dataDetail.qty}
                            </td>
                            <td className="border px-4 py-2">
                              {dataDetail.brand}
                            </td>
                            <td className="border px-4 py-2">
                              {dataDetail.additional_info || "-"}
                            </td>
                            <td className="border px-4 py-2">
                              {dataDetail.note || "-"}
                            </td>
                          </tr>
                        ))}
                      </Tbody>
                    </TableContent>
                  )}
                  <section>
                    <div></div>
                  </section>
                </td>
              </td>
            )}
          </>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableStocks;
