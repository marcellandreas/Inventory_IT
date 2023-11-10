import React, { useEffect, useRef, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";

const NewApplications = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabs = ["Semua", "DiAjukan", "Approved 1", "Approved 2", "Dotolak"];

  const tabRefs = tabs.map(() => useRef(null));

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    const activeTabRef = tabRefs[activeTab - 1];
    if (activeTabRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef.current;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeTab, tabRefs]);

  const TabContent = ({ activeTab }) => {
    if (activeTab === 1) {
      return <div>Content for Tab 1</div>;
    } else if (activeTab === 2) {
      return <div>Content for Tab 2</div>;
    } else if (activeTab === 3) {
      return <div>Content for Tab 3</div>;
    }
    return null;
  };

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <div className="flex  mb-4 relative">
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={tabRefs[index]}
              className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-t ${
                activeTab === index + 1 ? "bg-white" : ""
              }`}
              onClick={() => handleTabClick(index + 1)}
            >
              {tab}
            </div>
          ))}
          <div
            className="absolute  bottom-0 left-0 h-1 bg-blue-500"
            style={underlineStyle}
          />
        </div>
        <TabContent activeTab={activeTab} />
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default NewApplications;
