type Props = {
  children: string;
  tabIndex: number;
  activeTab: number;
  handleOnClick: (index: number) => void;
};

export const Tab = ({
  children,
  activeTab,
  tabIndex,
  handleOnClick,
}: Props) => {
  return (
    <li
      onClick={() => handleOnClick(tabIndex)}
      className={`flex flex-1 px-8 py-4 rounded-t-lg bg-bgPrimary border-b-2 border-bgSecondary items-center justify-center cursor-pointer ${
        activeTab === tabIndex
          ? "bg-alternate border-b-2 border-primary"
          : "bg-bgSecondary"
      } hover:transition-all`}
    >
      {children}
    </li>
  );
};
