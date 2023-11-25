import React from "react";

const TabBar = ({ tabs, toggleState, setToggleState, setSearch }) => {
  return (
    <>
      {tabs.map((label, index) => (
        <button
          key={index}
          onClick={() => {
            setToggleState(index + 1), setSearch("");
          }}
          className={`${
            toggleState === index + 1
              ? "bg-slate-500 hover:bg-slate-700"
              : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
          } rounded-md p-2 min-w-[100px]`}
        >
          {label}
        </button>
      ))}
    </>
  );
};

export default TabBar;
