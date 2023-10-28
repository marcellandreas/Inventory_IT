import { useNavigate } from "react-router-dom";

export const backToMenu = (back) => {
  const navigate = useNavigate();
  navigate(back);
};
