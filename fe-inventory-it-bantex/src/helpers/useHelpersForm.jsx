import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../Redux/Feature/StockSlice";
import { useEffect } from "react";
export function useHelpersFormData() {
  const categories = useSelector((state) => state.stocks.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const CategoriesPcMaster = ["PC", "LAPTOP"];
  const unitOptions = ["PCS", "DUS", "PAC", "Meter", "Ml", "Liter", "DLL"];
  const typeOptions = ["Hardware", "Software"];

  return { categories, CategoriesPcMaster, unitOptions, typeOptions };
}
