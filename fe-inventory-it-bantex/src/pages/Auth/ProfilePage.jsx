import { useEffect, useState } from "react";
import { CustomInput, Title } from "../../components/atoms";
import { ContentLayout, MainLayout } from "../../components/templates";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/Feature/UserSlice";
import { AxiosInstance } from "../../apis/api";
import profileImg from "../../assets/images/bg.jpeg";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const { code_user, username, id_user, full_name, email } = profile;
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [userData, setUserData] = useState({
    full_name: full_name,
    email: email,
  });

  useEffect(() => {
    dispatch(fetchProfile());
    setLoading(false);
  }, [dispatch, loading]);

  const [isTyping, setIsTyping] = useState(false); // State untuk melacak apakah pengguna sedang mengetik

  const handleTyping = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleUpdateProfile = async () => {
    try {
      // Lakukan permintaan PUT untuk mengubah profil
      const response = await AxiosInstance.put(
        `/auth/profile/${id_user}`,
        userData
      );
      alert("Profile Berhasil di updated");
      setLoading(true);
      setShowEdit(false);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      alert("Profile Gagal di updated");

      console.error("Error updating user profile:", error);
    }
  };
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <MainLayout>
      <ContentLayout>
        {loading ? (
          <p> Halaman Sedang memuat...</p>
        ) : (
          <section className="col-span-6 min-h-screen ">
            <div
              style={{ backgroundImage: `url(${profileImg})` }}
              className="flex col-span-6 bg-cover object-fill p-5 min-h-[50vh] rounded-3xl "
            >
              {/* <section className="absolute -bottom-10 sm:bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 col-span-3 bg-white p-5  rounded-xl flex flex-col gap-3">
              <Title>Personal Info:</Title>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 flex-wrap">
                  <CustomInput label="Code" value={code_user} readOnly={true} />
                  <CustomInput
                    label="Username"
                    value={username}
                    readOnly={true}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <CustomInput
                    label="Nama Lengkap"
                    value={userData.full_name}
                    name="full_name"
                    type="text"
                    onChange={handleChangeValue}
                  />
                  <CustomInput
                    label="Email"
                    type="email"
                    value={userData.email}
                    onChange={handleChangeValue}
                    name="email"
                  />
                </div>
              </div>
              <button onClick={handleUpdateProfile} className="button">
                Update
              </button>
            </section> */}
            </div>
            <div className=" grid grid-flow-dense grid-cols-4 gap-4">
              <section className=" col-span-2 shadow-2xl   mt-2 bg-white p-5  rounded-xl flex flex-col gap-3">
                <div className="flex justify-between">
                  <Title>Personal Info:</Title>
                  <button
                    onClick={() => {
                      setShowEdit(!showEdit);
                    }}
                    className="flex gap-2  font-semibold items-center justify-center underline
 text-blue-700                    "
                  >
                    <MdEdit size={20} />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <CustomInput
                      label="Code"
                      value={code_user}
                      readOnly={true}
                    />
                    <CustomInput
                      label="Username"
                      value={username}
                      readOnly={true}
                    />
                    <CustomInput
                      label="Nama Lengkap"
                      value={full_name}
                      readOnly={true}
                    />
                    <CustomInput label="Email" value={email} readOnly={true} />
                  </div>
                </div>
              </section>
              {showEdit ? (
                <section className=" col-span-2 mt-2 bg-white p-5  rounded-xl flex flex-col gap-3 ">
                  <div className="flex gap-2 flex-wrap">
                    <CustomInput
                      label="Nama Lengkap"
                      type="text"
                      name="full-name"
                      // className="col-span-3 md:col-span-1"
                      placeholder="Enter Your New Item Location"
                      value={userData.full_name}
                      onChange={handleChangeValue}
                    />
                    <CustomInput
                      label="Email"
                      type="email"
                      name="email"
                      // className="col-span-3 md:col-span-1"
                      placeholder="Enter Your New Email Location"
                      value={userData.email}
                      onChange={handleChangeValue}
                    />

                    <button onClick={handleUpdateProfile} className="button">
                      Update
                    </button>
                  </div>
                </section>
              ) : null}
            </div>
          </section>
        )}
        {/* <img src={profileImg} className="col-span-6" alt="" /> */}
      </ContentLayout>
    </MainLayout>
  );
};

export default ProfilePage;
