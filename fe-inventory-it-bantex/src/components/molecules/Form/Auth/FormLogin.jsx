import { NavLink } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const FormLogin = ({
  handleLogin,
  show,
  handleShow,
  setUsername,
  setPassword,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      className="w-full flex flex-col gap-4 justify-center items-center"
    >
      <div className=" text-center text-base font-semibold text-slate-500">
        <span>Login into your account</span>
      </div>
      <div className="flex relative w-full ">
        <div className="flex  gap-2 flex-col w-full">
          <label className="text-lg font-semibold text-slate-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Your Username"
            className="rounded-xl p-3 bg-slate-100"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="h-12 text-white font-semibold text-xl bg-slate-800 self-end w-12 rounded-xl absolute right-0 flex justify-center items-center">
          <FiUser />
        </div>
      </div>
      <div className="flex relative w-full ">
        <div className="flex  gap-2 flex-col w-full">
          <label className="text-lg font-semibold text-slate-700">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            className="rounded-xl p-3 bg-slate-100 "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div
          onClick={handleShow}
          className="h-12 text-white font-semibold text-xl bg-slate-800 self-end w-12 rounded-xl absolute right-0 flex justify-center items-center"
        >
          {show ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      <button type="submit" className="button w-full p-3 text-base">
        <span>Login now</span>
      </button>
      <span>or</span>
      <NavLink to={"/register"} className="button_2 w-full">
        <span>Register now</span>
      </NavLink>
    </form>
  );
};

export default FormLogin;
