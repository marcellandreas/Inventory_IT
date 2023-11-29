import React from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function CustomButton({ style, children, onClick }) {
  let className = "";
  switch (style) {
    case 1:
      className +=
        "bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 flex   text-sm justify-center items-center gap-2";
      break;
    case 2:
      className +=
        "border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white flex   text-sm justify-center items-center gap-2";
      break;
    case 3:
      className +=
        "bg-red-700 text-white w-10 h-10 flex   text-sm justify-center items-center rounded-md  self-end";
      break;
    case 4:
      className += " p-2 bg-blue-700 rounded-lg  text-sm";
      break;
    default:
      className += "style";
      break;
  }

  const buttonStyle = {
    width: "fit-content",
  };

  return (
    <button className={className} style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

const BackButton = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={`button ${className || ""}`}>
      <BsArrowLeftCircleFill className={`  text-white `} />
      Kembali
    </button>
  );
};

export { CustomButton, BackButton };
