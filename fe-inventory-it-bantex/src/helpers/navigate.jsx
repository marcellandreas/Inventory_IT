import { useNavigate } from "react-router-dom";

export function navigateBack() {
  const navigate = useNavigate();
  navigate(-1);
}
