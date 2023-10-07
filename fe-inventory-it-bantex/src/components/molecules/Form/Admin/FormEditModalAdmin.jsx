import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";

const FormEditModalAdmin = ({ onClose, setIsLoading, id }) => {
  const [formValues, setFormValues] = useState({
    code_user: "",
    username: "",
    password: "",
    role: 1,
  });
  console.log(id, "form modal");

  const [validation, setValidation] = useState([]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    code_user: formValues.code_user,
    username: formValues.username,
    password: formValues.password,
    role: formValues.role,
  };

  useEffect(() => {
    AxiosInstance.get(`users/${id}`).then((res) => {
      const itemData = res.data.data;
      const mappedItemData = itemData.map((item) => ({
        code_user: item.code_user,
        username: item.username,
        password: item.password,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataAuth(formValues);
    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    AxiosInstance.patch(`/users/${id}`, data)
      .then((res) => {
        onClose();
        setIsLoading(true);
        alert("berhasil");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleUpdateForm}
      className="form_modal max-h-[600px]  overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Edit Admin </h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <div className="content_input">
        <label>Code Admin</label>
        <input
          type="text"
          name="code_user"
          placeholder="Enter Your New Code User"
          value={formValues.code_user}
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Your New Username"
          value={formValues.username}
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
      </div>
      <div className="content_input">
        <label>Password</label>
        <input
          type="text"
          name="password"
          placeholder="Enter Your New password"
          value={formValues.password}
          className="p-1 rounded-md"
          onChange={handleChangeValue}
        />
      </div>
      {validation.length > 0 && (
        <div>
          {validation.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button className="button flex-1">Simpan</button>
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
      </div>
    </form>
  );
};

export default FormEditModalAdmin;
