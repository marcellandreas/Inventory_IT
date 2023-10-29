import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";
import { CustomInput, CustomSelect } from "../../../atoms";

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
      className="md:w-auto mx-5 w-[450px] bg-amber-300 p-4 rounded-xl flex flex-col gap-2 items-center max-h-[600px]  overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Tambah User</h1>
      <hr className="border border-slate-800 w-full m-0" />
      <CustomSelect
        label="Peran Role"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Peran Role
          </option>,
          ...roles.map((role, index) => (
            <option key={index} value={role}>
              {roleLabels[role]}
            </option>
          )),
        ]}
        name="role"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Username"
        type="text"
        placeholder="Masukan Username"
        name="username"
        onChange={handleChangeValue}
      />

      <CustomInput
        label="Password"
        type="text"
        name="password"
        placeholder="Masukan Password"
        onChange={handleChangeValue}
      />

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
