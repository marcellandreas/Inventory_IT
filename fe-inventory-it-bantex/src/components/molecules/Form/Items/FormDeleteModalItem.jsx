import { useDispatch } from "react-redux";
import { deleteItem } from "../../../../Redux/Feature/ItemsSlice";
import {
  useFetchDetailStock,
  useFetchItemById,
  useFetchStocks,
} from "../../../../config/GetData";
import { useEffect, useState } from "react";
import { updatePlusQtyDetails } from "../../../../Redux/Feature/detailStockslice";
import { updateStockQty } from "../../../../Redux/Feature/StockSlice";
import { TitleForm } from "../../../atoms";

const FormDeleteModalItem = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const dataItemById = useFetchItemById(id);
  const dataStock = useFetchStocks();
  const dataDetailStock = useFetchDetailStock();

  const [matchingStocks, setMatchingStocks] = useState([]);
  const [matchingDesc, setMatchingDesc] = useState([]);
  useEffect(() => {
    if (dataStock) {
      const matchingStockData = dataStock.filter(
        (data) => data.category === dataItemById.category
      );
      const matchingStockNos = matchingStockData.map((data) => data.stock_no);
      const validStockNos = matchingStockNos.filter(
        (stockNo) => stockNo !== undefined && stockNo !== null
      );
      setMatchingStocks(validStockNos);
    }
  }, [dataItemById]);
  useEffect(() => {
    if (dataDetailStock) {
      const matchingStockData = dataDetailStock.filter(
        (data) =>
          data.stock_detail_description === dataItemById.item_description
      );
      const matchingStockNos = matchingStockData.map(
        (data) => data.id_detail_stock
      );
      const validStockNos = matchingStockNos.filter(
        (stockNo) => stockNo !== undefined && stockNo !== null
      );
      setMatchingDesc(validStockNos);
    }
  }, [dataDetailStock, dataItemById]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (matchingStocks.length > 0) {
      dispatch(deleteItem(id));
      // qty stock dan qty detail stock +1
      if (matchingDesc.length > 0) {
        const dataDetailPost = [
          {
            id_detail_stock: matchingDesc[0],
            qty: 1,
          },
        ];
        const updateDetailsResult = dispatch(
          updatePlusQtyDetails(dataDetailPost)
        );
        if (updateDetailsResult) {
          alert("data tidak dapat dihapus ketika masih terhubung kekomputer");
          dispatch(updateStockQty(matchingStocks[0]));
        }
      } else {
        alert("item descption does not match");
      }
      onClose();
    } else {
      alert("Category does not match");
    }
  };
  return (
    <form className="form_modal">
      <div className=" ">
        <TitleForm>Hapus Barang</TitleForm>
        <hr className="border border-slate-800 w-2/5 m-auto" />
      </div>
      <section className="flex text-md flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus Barang ini:</p>
        <div className="delete_item_box">{dataItemById.item_description}</div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button onClick={handleDelete} className="button flex-1">
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalItem;
