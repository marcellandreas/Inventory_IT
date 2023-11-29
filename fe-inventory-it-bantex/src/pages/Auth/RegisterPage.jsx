import AuthTemp from "../../components/templates/Auth";
import { useState } from "react";
import { AxiosInstance } from "../../apis/api";
import FormRegister from "../../components/molecules/Form/Auth/FormRegister";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    password: "",
    role: 2,
    username: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await AxiosInstance.post("/auth/register", formValues)
      .then((res) => {
        alert(res.data.message);
        setNavigate(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthTemp>
      <FormRegister
        handleChangeValue={handleChangeValue}
        handleShow={handleShow}
        handleLogin={handleRegister}
        show={show}
      />
    </AuthTemp>
  );
};

export default RegisterPage;
