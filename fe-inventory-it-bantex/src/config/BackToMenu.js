import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const backToMenu = () => {
  navigate(-1);
};

export { backToMenu };
