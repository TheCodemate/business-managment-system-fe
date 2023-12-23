import { useMobileMenuContext } from "../context";

export const HamburgerMenuButton = () => {
  const { onClickHandler, isExpanded } = useMobileMenuContext();

  return (
    <button
      className={`flex flex-col  ${
        isExpanded ? "justify-center" : "justify-between"
      } bg-bgPrimary w-8 h-6`}
      onClick={onClickHandler}
    >
      <span
        className={`h-0.5
       w-full bg-primary ${
         isExpanded ? "rotate-[45deg] translate-y-0.5" : "rotate-0"
       } transition ease transform duration-150 -translate-y-0.5`}
      ></span>
      <span
        className={`h-0.5 w-full bg-primary ${
          isExpanded ? "opacity-0" : "opacity-100"
        } transition ease transform duration-150`}
      ></span>
      <span
        className={`h-0.5 w-full bg-primary   ${
          isExpanded
            ? "rotate-[-45deg] -translate-y-0.5"
            : "rotate-0 translate-y-0.5"
        } transition ease transform duration-150`}
      ></span>
    </button>
  );
};
