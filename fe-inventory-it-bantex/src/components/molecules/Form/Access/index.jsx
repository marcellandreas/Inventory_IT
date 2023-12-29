import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../apis/api";
import { validateFormDataAuth } from "../../../../config/ValidateForm";
import { CustomInput, CustomSelect } from "../../../atoms";
import {
  fetchUserData,
  updateUserData,
} from "../../../../Redux/Feature/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FormAddUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    AxiosInstance.get("/auth/unique")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    role: "",
    full_name: "",
    email: "",
  });

  const [validation, setValidation] = useState([]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const data = {
    username: formValues.username,
    password: formValues.password,
    role: Number(formValues.role),
    full_name: formValues.full_name,
    email: formValues.email,
  };

  const roleLabels = {
    1: "Admin",
    2: "User",
    3: "Manager",
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();
    const errors = validateFormDataAuth(formValues);
    if (errors.length > 0) {
      setValidation(errors);
      return;
    }
    await AxiosInstance.post("/auth/register", data)
      .then((res) => {
        alert(res.data.message);
        onClose();
        dispatch(fetchUserData());
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <form
      onSubmit={handleCreateForm}
      className="md:w-auto mx-5  bg-amber-300 p-4 rounded-xl flex flex-col gap-2 items-center max-h-[600px]  overflow-y-auto"
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
        label="Nama Lengkap"
        type="text"
        placeholder="Masukan Nama Lengkap"
        name="full_name"
        onChange={handleChangeValue}
      />
      <CustomInput
        label="Email"
        type="email"
        placeholder="Masukan Email"
        name="email"
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
      <div className="flex flex-wrap gap-2 w-full">
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

const FormDeleteUser = ({ onClose, id, setIsLoading }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    AxiosInstance.get(`/users/${id}`).then((res) => {
      setData(res.data.data.map((item) => item.username));
    });
  }, [id]);
  const handleDelete = async (e) => {
    e.preventDefault();
    AxiosInstance.delete(`/auth/user/${id}`)
      .then((res) => {
        alert(res.data.message);
        dispatch(fetchUserData());
        onClose();
      })
      .catch((err) => {
        console.log(err);
        alert("gagal di hapus");
      });
  };

  console.log(formValues);
  return (
    <form className="form_modal">
      <h1 className=" text-lg font-bold text-center">Hapus Akun Admin</h1>
      <hr className="border border-slate-800 w-full m-auto" />
      <section className="flex flex-col items-center gap-2 w-full justify-center">
        <p>Anda yakin ingin menghapus User</p>
        <div className="delete_item_box">{data}</div>
      </section>
      <div className="flex flex-wrap gap-2 w-full">
        <button
          onClick={() => {
            onClose();
          }}
          className="button_2 flex-1"
        >
          Kembali
        </button>
        <button onClick={handleDelete} className="button flex-1">
          Ya, Hapus Sekarang
        </button>
      </div>
    </form>
  );
};

const FormEditUser = ({ onClose, id }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    AxiosInstance.get("/auth/unique")
      .then((response) => {
        setRoles(response.data.data);
        dispatch(fetchUserData());
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
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
    role: Number(formValues.role),
  };

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

    dispatch(updateUserData({ id, data, dispatch }))
      .unwrap()
      .then((res) => {
        onClose();
        alert(`🦄 ${res.message} `);
      })
      .catch((err) => {
        onClose();
        toast.error(err.message);
      });
  };

  const dataRole = [
    { name: "Admin", role: 1 },
    { name: "User", role: 2 },
    { name: "Managers", role: 3 },
  ];

  return (
    <form
      onSubmit={handleUpdateForm}
      className="md:w-auto mx-5 bg-amber-300 p-4 rounded-xl flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto"
    >
      <h1 className="text-lg font-bold text-center">Edit Data Pengguna</h1>
      <hr className="border border-slate-800 w-full m-auto" />
      <CustomInput
        label="Username"
        type="text"
        placeholder="Masukan Username"
        name="username"
        value={formValues.username}
        onChange={handleChangeValue}
      />

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
      <CustomSelect
        label="Hak Akses "
        options={[
          <option key="default" value="" disabled selected>
            Pilih Hak akses
          </option>,
          ...dataRole.map((unit, index) => (
            <option key={index} value={unit.role}>
              {`${unit.name}`}
            </option>
          )),
        ]}
        name="role"
        value={formValues.role}
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

export { FormAddUser, FormEditUser, FormDeleteUser };
