import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";

const FormAddModalUser = ({ onClose, setIsLoading }) => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    // Mengambil daftar peran unik melalui API
    AxiosInstance.get("/auth/unique")
      .then((response) => {
        setRoles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [validation, setValidation] = useState([]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    username: formValues.username,
    password: formValues.password,
    role: formValues.role,
  };

  const roleLabels = {
    1: "Admin",
    2: "User",
    3: "Manager",
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const errors = validateFormDataAuth(formValues);

    // Jika ada error, tampilkan error
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    await AxiosInstance.post("/auth/register", data)
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
      <div className="gap-2 flex flex-col w-60">
        <label className="min-w-[140px]">Peran User</label>
        <div className="flex justify-end items-end gap-2">
          <select
            className="content_input"
            onChange={handleChangeValue}
            name="role"
          >
            <option value="">Pilih peran</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {roleLabels[role]}
              </option>
            ))}
          </select>
        </div>
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
