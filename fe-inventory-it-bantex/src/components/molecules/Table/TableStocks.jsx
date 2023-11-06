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
        {data?.map((barang, i) => (
          <>
            <tr key={barang.id_stock} className=" relative">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border">
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
              <td className="border px-4 ">{barang.note}</td>
              <td className="border px-4 py-2">{barang.post_username}</td>
              <td className="border px-4 py-2">
                {barang?.post_date?.slice(0, 10)}
              </td>
              <td className="flex gap-2">
                <NavLink to={`ubah/${barang.stock_no}`} className="button_edit">
                  <MdEditNote />
                </NavLink>
                <button
                  onClick={() => {
                    setDeleteModal(true);

                    setId(barang.id_stock);
                  }}
                  className="button_delete"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
            {selectedStockNo === barang.stock_no && (
              <td colSpan={12} className="bg-blue-300 -z-50 px-0 py-2 m-0">
                <td
                  colSpan={6}
                  className="relative z-30"
                  key={`dropdown-${barang.id_stock}`}
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
