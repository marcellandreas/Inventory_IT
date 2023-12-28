import { useDispatch, useSelector } from "react-redux";
import { fetchStockByNo, fetchStocks } from "../Redux/Feature/StockSlice";
import { fetchItemById, fetchItems } from "../Redux/Feature/ItemsSlice";
import { useEffect } from "react";
import { fetchUserData } from "../Redux/Feature/UserSlice";
import { fetchAllData } from "../Redux/Feature/ItemsRequest";
import {
  fetchDetailStock,
  fetchQtyStockAboveOne,
  fetchStockDetails,
  fetchStockDetailsByid,
} from "../Redux/Feature/detailStockslice";
import {
  fetchFormDataReqSubById,
  fetchReqSub,
} from "../Redux/Feature/requestSubmissionSlice";
import {
  fechtPcLineData,
  fetchItemsUnusedForPcMaster,
} from "../Redux/Feature/DataPcMaster";
import {
  fetchDivision,
  fetchDivisionId,
  fetchPt,
  fetchPtId,
} from "../Redux/Feature/DivPtSlice";
import {
  fetchCategories,
  fetchCategoriesId,
  fetchDataCategories,
} from "../Redux/Feature/categoriesSlice";

// Items
export function useFetchItems() {
  const dispatch = useDispatch();
  const dataItems = useSelector((state) => state.itemsSlice.data);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return dataItems;
}

export function useFetchItemById(id) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.itemsSlice.dataById);
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [id]);
  return data;
}

// Stock
export function useFetchStocks() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stocks.data);
  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);
  return data;
}

export function useFetchDetailStock() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailStock.data);
  useEffect(() => {
    dispatch(fetchDetailStock());
  }, [dispatch]);
  return data;
}

// get data by stock no
export function useFetchStockByNo(stockNo) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stocks.databyStockNo);
  useEffect(() => {
    dispatch(fetchStockByNo(stockNo));
  }, [dispatch, stockNo]);
  return data;
}

export function useFetchStockDetailsByStockNo(stockNo) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailStock.dataDetailStockNo);
  useEffect(() => {
    dispatch(fetchStockDetails(stockNo));
  }, [dispatch, stockNo]);

  return data;
}

export function useFecthStockDetailsById(idDetailStock) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailStock.dataDetailId);
  useEffect(() => {
    dispatch(fetchStockDetailsByid(idDetailStock));
  }, [dispatch, idDetailStock]);
  return data;
}
export function useFecthQtyStockAvobeOne(stockNo) {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.detailStock.dataDetailStockNoAbove1
  );
  useEffect(() => {
    dispatch(fetchQtyStockAboveOne(stockNo));
  }, [dispatch, stockNo]);
  return data;
}

export function usePostDetailStock(dataDetailPost) {}

// User
export function useFetchUsers() {
  const dispatch = useDispatch();
  const { admins, users, managers, allData, isLoading, error } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return { admins, users, managers, allData, isLoading, error };
}

// Pengajuan
export function useFetchRequestSubmission() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reqSub.data);
  useEffect(() => {
    dispatch(fetchReqSub());
  }, [dispatch]);
  return data;
}

export function useFetchFormDataReqSubById(id) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reqSub.dataById);
  useEffect(() => {
    dispatch(fetchFormDataReqSubById(id));
  }, [dispatch, id]);
  return data;
}

// data unused componnets in pc master
export function useFetchItemsUnusedForPcMaster() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pcmaster.dataUnused);
  useEffect(() => {
    dispatch(fetchItemsUnusedForPcMaster());
  }, [dispatch]);
  return data;
}
export function useFetchPcLineData() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pcmaster.dataPcLine);
  useEffect(() => {
    dispatch(fechtPcLineData());
  }, [dispatch]);
  return data;
}

export function useFetchPt() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.divPt.dataPt);
  useEffect(() => {
    dispatch(fetchPt());
  }, [dispatch]);
  return data;
}

export function useFetchPtId(id) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.divPt.dataPtId);
  useEffect(() => {
    dispatch(fetchPtId(id));
  }, [id]);
  return data;
}

// ============================================================================ //

export function useFetchDivision(namePt) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.divPt.dataDivision);
  useEffect(() => {
    dispatch(fetchDivision(namePt));
  }, [namePt]);
  return data;
}

export function useFetchDivisionId(id) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.divPt.dataDivisionId);
  useEffect(() => {
    dispatch(fetchDivisionId(id));
  }, [id]);
  return data;
}

// ============================================================================ //

// categories
export function useFetchCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return categories;
}

export function useFetchDataCategories() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.data);
  useEffect(() => {
    dispatch(fetchDataCategories());
  }, [dispatch]);
  return data;
}

// categories id
export function useFetchCategoriesId(id) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.categoriesId);
  useEffect(() => {
    dispatch(fetchCategoriesId(id));
  }, [id]);
  return data;
}
