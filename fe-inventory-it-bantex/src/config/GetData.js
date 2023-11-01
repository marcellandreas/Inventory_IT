import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchStocks } from "../Redux/Feature/StockSlice";
import { fetchItems } from "../Redux/Feature/ItemsSlice";
import { useEffect } from "react";
import { fetchUserData } from "../Redux/Feature/UserSlice";
import { fetchAllData } from "../Redux/Feature/ItemsRequest";

// categories
export function useFetchCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.stocks.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return categories;
}

// Items
export function useFetchItems() {
  const dispatch = useDispatch();
  const dataItems = useSelector((state) => state.itemsSlice.data);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return dataItems;
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
  const data = useSelector((state) => state.dataSliceItemReq.allData);
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);
  return data;
}
