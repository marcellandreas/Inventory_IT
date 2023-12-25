import { NavLink } from "react-router-dom";

import {
  FaRegEye,
  FaRegEyeSlash,
  FiUser,
  AiOutlineMail,
} from "../../../../assets/icons/icons";

const FormRegister = ({ handleLogin, handleChangeValue, handleShow, show }) => {
  return (
    <form
      onSubmit={handleLogin}
      className="w-full flex flex-col gap-4 justify-center items-center"
    >
      <span className=" text-center text-base font-semibold text-slate-600">
        Register into your account
      </span>
      <div className="grid grid-flow-dense grid-cols-4 w-full gap-2">
        <div className="flex relative col-span-4 sm:col-span-2 ">
          <div className="flex  gap-2 flex-col w-full">
            <label className="text-lg font-semibold text-slate-700">name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter Your Username"
              className="rounded-xl p-3 bg-slate-100"
              onChange={handleChangeValue}
              required
            />
          </div>
          <div className="h-12 text-white font-semibold text-xl bg-slate-800 self-end w-12 rounded-xl absolute right-0 flex justify-center items-center">
            <FiUser />
          </div>
        </div>
        <div className="flex relative col-span-4 sm:col-span-2 ">
          <div className="flex  gap-2 flex-col w-full">
            <label className="text-lg font-semibold text-slate-700">
              email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="rounded-xl p-3 bg-slate-100"
              onChange={handleChangeValue}
              required
            />
          </div>
          <div className="h-12 text-white font-semibold text-xl bg-slate-800 self-end w-12 rounded-xl absolute right-0 flex justify-center items-center">
            <AiOutlineMail />
          </div>
        </div>
      </div>
      <div className="flex relative col-span-2 w-full ">
        <div className="flex  gap-2 flex-col w-full">
          <label className="text-lg font-semibold text-slate-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            className="rounded-xl p-3 bg-slate-100"
            onChange={handleChangeValue}
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
            name="password"
            className="rounded-xl p-3 bg-slate-100 "
            onChange={handleChangeValue}
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
        <span>Register now</span>
      </button>
      <span>or</span>
      <NavLink to={`/login`} className="button_2 w-full">
        <span>Login now</span>
      </NavLink>
    </form>
  );
};

export default FormRegister;
