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
    full_name: "",
    email: "",
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
    full_name: formValues.full_name,
    email: formValues.email,
    role: formValues.role,
  };

  console.log(data);

  useEffect(() => {
    AxiosInstance.get(`/users/${id}`).then((res) => {
      const itemData = res.data.data;
      const mappedItemData = itemData.map((item) => ({
        username: item.username,
        password: item.password,
        full_name: item.full_name,
        email: item.email,
        role: item.role,
      }));
      setFormValues(mappedItemData[0]);
    });
  }, []);

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
      className="md:w-auto mx-5 bg-amber-300 p-4 rounded-xl flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto"
    >
      <h1 className="text-lg font-bold text-center">Edit Data Pengguna </h1>
      <hr className="border border-slate-800 w-full m-auto" />
      {/* <div className=" border border-gray-800 rounded-md p-4"> */}
      <CustomInput
        label="Username"
        type="text"
        placeholder="Masukan Username"
        name="username"
        value={formValues.username}
        onChange={handleChangeValue}
      />
      {/* <CustomInput
        label="Password"
        type="text"
        name="password"
        placeholder="Masukan Password"
        onChange={handleChangeValue}
        value={formValues.password}
      /> */}
      <CustomInput
        label="nama Lengkap"
        type="text"
        name="full_name"
        onChange={handleChangeValue}
        value={formValues.full_name}
      />
      <CustomInput
        label="Email"
        type="email"
        name="email"
        onChange={handleChangeValue}
        value={formValues.email}
      />

      {/* </div> */}

      {/* <CustomSelect
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
      /> */}

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
