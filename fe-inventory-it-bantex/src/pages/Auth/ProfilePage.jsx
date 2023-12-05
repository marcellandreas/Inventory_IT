import { useEffect, useState } from "react";
import { CustomInput, Title } from "../../components/atoms";
import { ContentLayout, MainLayout } from "../../components/templates";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/Feature/UserSlice";
import { AxiosInstance } from "../../apis/api";
import profileImg from "../../assets/images/bg.jpeg";
import { MdEdit } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

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

  const [isTyping, setIsTyping] = useState(false);

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
              style={{
                backgroundImage: `url(${profileImg})`,
                backgroundAttachment: "fixed",
              }}
              className="flex col-span-6 bg-cover object-fill p-5 min-h-[50vh] rounded-3xl "
            ></div>
            <div className=" grid grid-flow-dense grid-cols-4 gap-4 w-full">
              <section className=" md:col-span-2 shadow-2xl col-span-4  mt-2 bg-white p-5  rounded-xl flex flex-col gap-3">
                <div className="flex justify-between">
                  <Title>
                    <div className="flex gap-2">
                      <FaUserCog />
                      Personal Info:
                    </div>
                  </Title>
                  <button
                    onClick={() => {
                      setShowEdit(!showEdit);
                    }}
                    className="flex gap-2  font-semibold items-center justify-center underline text-blue-700                    "
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
                <section className=" md:col-span-2  col-span-4 mt-2 bg-white p-5  rounded-xl flex flex-col gap-3 ">
                  <div className="flex gap-2 flex-wrap">
                    <CustomInput
                      label="Nama Lengkap"
                      type="text"
                      name="full_name"
                      placeholder="Enter Your New Item Location"
                      value={userData.full_name}
                      onChange={handleChangeValue}
                    />
                    <CustomInput
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter Your New Email Location"
                      value={userData.email}
                      onChange={handleChangeValue}
                    />

                    <button
                      onClick={handleUpdateProfile}
                      className="button col-span-1 row-span-1 h-[5vh] place-self-end"
                    >
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
