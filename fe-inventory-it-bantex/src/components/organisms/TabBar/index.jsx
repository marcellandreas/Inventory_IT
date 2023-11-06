import React from "react";

const TabBar = ({ tabs, toggleState, setToggleState, setSearch }) => {
  return (
    <section className="flex flex-wrap  w-full gap-2 p-2 bg-slate-200 mb-5 rounded-lg order-1 ">
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
          } rounded-md p-1 min-w-[100px]`}
        >
          {label}
        </button>
      ))}
    </section>
  );
};

export default TabBar;
