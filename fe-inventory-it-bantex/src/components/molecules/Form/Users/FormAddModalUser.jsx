import { useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";

const FormAddModalUser = ({ onClose, setIsLoading }) => {
  const [formValues, setFormValues] = useState({
    code_user: "",
    username: "",
    password: "",
  });

  const [validation, setValidation] = useState([]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    code_user: formValues.code_user,
    username: formValues.username,
    password: formValues.password,
    role: 2,
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const errors = validateFormDataAuth(formValues);

    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    await AxiosInstance.post("/users", data)
      .then((res) => {
        console.log(res);
        onClose();
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleCreateForm}
      className="form_modal max-h-[600px]  overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Tambah User </h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />
      <div className="content_input">
        <label>Code User</label>
        <input
          type="text"
          name="code_user"
          placeholder="Enter Your New Code User"
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

export default FormAddModalUser;
