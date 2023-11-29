import React from "react";
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
      <Thead>{tableHeaders}</Thead>
      <Tbody>
        {data?.map((stock, i) => (
          <React.Fragment key={i}>
            <tr className=" relative">
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
            {selectedStockNo === stock.stock_no && (
              <>
                <td colSpan={12} className="bg-white -z-50 p-1  m-0">
                  {dataDetailStockNo.length === 0 ? (
                    <p>data kosong</p>
                  ) : (
                    <>
                      {dataDetailStockNo.slice(0, 5).map((data, index) => {
                        return (
                          <div
                            key={index}
                            className="p-2 w-full bg-gray-200 rounded-md flex gap-2 text-sm mb-1 "
                          >
                            <div className="w-8 ">
                              <p className=" text-gray-500 font-semibold">ID</p>
                              <span className=" font-semibold text-slate-800">
                                {index + 1}
                              </span>
                            </div>
                            <div className="w-40 ">
                              <p className=" text-gray-500 font-semibold">
                                Nama Stock
                              </p>
                              <span className=" font-semibold text-slate-800">
                                {data.stock_detail_description || "-"}
                              </span>
                            </div>
                            <div className="w-16 ">
                              <p className=" text-gray-500 font-semibold">
                                QTY
                              </p>
                              <span className=" font-semibold text-slate-800">
                                {data.qty || "-"}
                              </span>
                            </div>
                            <div className="w-40 ">
                              <p className=" text-gray-500 font-semibold">
                                Merek
                              </p>
                              <span className=" font-semibold text-slate-800">
                                {data.brand || "-"}
                              </span>
                            </div>
                            <div className="w-40 ">
                              <p className=" text-gray-500 font-semibold">
                                Info
                              </p>
                              <span className=" font-semibold text-slate-800">
                                {data.additional_info || "-"}
                              </span>
                            </div>
                            <div className="w-60 ">
                              <p className=" text-gray-500 font-semibold line-clamp-4">
                                Catatan
                              </p>
                              <span className=" font-semibold text-slate-800">
                                {data.note || "-"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </td>
              </>
            )}
          </React.Fragment>
        ))}
      </Tbody>
    </TableContent>
  );
};

export default TableStocks;
