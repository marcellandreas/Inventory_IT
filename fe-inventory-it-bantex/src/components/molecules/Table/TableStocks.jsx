import { useEffect, useState } from "react";
import {
  columnTableStock,
  columnTableStockDetail,
} from "../../../assets/data/ColumnTables";
import { TableContent, Tbody, Thead } from "../../atoms";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockDetails } from "../../../Redux/Feature/DetailStockslice";
import { MdDelete, MdEditNote } from "react-icons/md";
import { NavLink } from "react-router-dom";

const TableStocks = ({
  setEditModalStock,
  setDeleteModalStock,
  data,
  setId,
}) => {
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
  const [selectedStockNo, setSelectedStockNo] = useState("");

  const dispatch = useDispatch();

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
        {data?.map((barang, i) => (
          <>
            <tr key={barang.id_stock}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className=" px-4 py-2 flex gap-2 justify-center items-center">
                <div
                  className="flex gap-2 justify-center items-center"
                  onClick={() => handleStockNoClick(barang.stock_no)}
                >
                  <ArrowIcon isOpen={selectedStockNo === barang.stock_no} />
                  {barang.stock_no}
                </div>
              </td>
              <td className="border px-4 py-2">{barang.stock_description}</td>
              <td className="border px-4 py-2">{barang.stock_qty}</td>
              <td className="border px-4 py-2">{barang.category}</td>
              <td className="border px-4 py-2">{barang.unit}</td>
              <td className="border px-4 py-2">{barang.type}</td>
              <td className="border px-4 py-2">{barang.note}</td>
              <td className="border px-4 py-2">{barang.post_username}</td>
              <td className="border px-4 py-2">{barang.post_date}</td>
              <td className="flex gap-2">
                <NavLink to={`ubah/${barang.stock_no}`} className="button_edit">
                  <MdEditNote />
                </NavLink>
                {/* <button
                  onClick={() => {
                    setEditModalStock(true);
                    setId(barang.id_stock);
                  }}
                  className="p-2 bg-blue-700 rounded-lg"
                >
                  <MdEditNote />
                </button> */}
                <button
                  onClick={() => {
                    setDeleteModalStock(true);
                    setId(barang.id_stock);
                  }}
                  className="button_delete"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
            {selectedStockNo === barang.stock_no && (
              <td colSpan={10} className=" ">
                <td colSpan={8}>
                  <div
                    className="relative z-30"
                    key={`dropdown-${barang.id_stock}`}
                  >
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
                  </div>
                </td>
                <td colSpan={2}>
                  <div className="w-20 bg-red-400 min-h-[50px]"></div>
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
