import { useSelector, useDispatch } from "react-redux";
import { fetchStocks } from "../Redux/Feature/StockSlice";
import { useEffect } from "react";
import { fetchCategories } from "../Redux/Feature/categoriesSlice";
export function useHelpersFormData() {
  const categories = useSelector((state) => state.categories.categories);
  const stockData = useSelector((state) => state.stocks.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchStocks());
  }, [dispatch]);

  const CategoriesPcMaster = ["PC", "LAPTOP"];
  const unitOptions = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const typeOptions = ["Hardware", "Software"];

  return {
    categories,
    stockData,
    CategoriesPcMaster,
    unitOptions,
    typeOptions,
  };
}
