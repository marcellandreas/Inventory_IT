import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
export const backToMenu = () => {
  navigate(-1);
};
