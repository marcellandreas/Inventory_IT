import { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";
import { CustomInput, CustomSelect } from "../../../atoms";
import {
  fetchUserData,
  updateUserData,
} from "../../../../Redux/Feature/UserSlice";
import { useDispatch } from "react-redux";

const FormEditModalUser = ({ onClose, setIsLoading, id }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    role: "",
  });
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

  console.log(data);

  useEffect(() => {
    AxiosInstance.get(`/users/${id}`).then((res) => {
      const itemData = res.data.data;
      const mappedItemData = itemData.map((item) => ({
        username: item.username,
        password: item.password,
        role: item.role,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

  const roleLabels = {
    1: "Admin",
    2: "User",
    3: "Manager",
  };

  const dispatch = useDispatch();

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const errors = validateFormDataAuth(formValues);

    if (errors.length > 0) {
      setValidation(errors);
      return;
    }

    // Memanggil async thunk
    dispatch(updateUserData({ id, data }))
      .unwrap()
      .then(() => {
        onClose();
        alert("Berhasil");
        dispatch(fetchUserData());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleUpdateForm}
      className="md:w-auto mx-5 w-[450px] bg-amber-300 p-4 rounded-xl flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto"
    >
      <h1 className="text-2xl text-center">Edit User </h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />

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
        value={formValues.role}
        name="role"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Username"
        type="text"
        placeholder="Masukan Username"
        name="username"
        value={formValues.username}
        onChange={handleChangeValue}
      />

      <CustomInput
        label="Password"
        type="text"
        name="password"
        placeholder="Masukan Password"
        onChange={handleChangeValue}
        value={formValues.password}
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

export default FormEditModalUser;
