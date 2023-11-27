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
              : "bg-slate-300 hover:bg-slate-500 "
          } rounded-md p-1  min-w-[100px] text-slate-900 font-semibold `}
        >
          {label}
        </button>
      ))}
    </>
  );
};

export default TabBar;
