import { useState } from "react";
import { OutletSection } from "./OutletSection";
import { Tab } from "./Tab";

export const Tabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleOnClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex flex-col flex-1">
      <ul className="flex w-full bg-bgSecondary first:rounded-tl-lg last:rounded-tr-lg pt-2">
        <Tab
          handleOnClick={handleOnClick}
          activeTab={activeTabIndex}
          tabIndex={0}
        >
          Contact Details
        </Tab>
        <Tab
          handleOnClick={handleOnClick}
          activeTab={activeTabIndex}
          tabIndex={1}
        >
          Products
        </Tab>
        <Tab
          activeTab={activeTabIndex}
          handleOnClick={handleOnClick}
          tabIndex={2}
        >
          Conditions
        </Tab>
      </ul>
      <OutletSection>
        <div className="flex-1 flex justify-center items-center w-full bg-bgSecondary rounded-lg p-12 font-bold text-details">
          We're sorry, data is not available at the moment
        </div>
      </OutletSection>
    </div>
  );
};
