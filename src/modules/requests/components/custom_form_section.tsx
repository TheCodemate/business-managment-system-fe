import { ReactNode } from "react";

type ResponseFormSectionType = {
  headerTitle: string;
  children: ReactNode | ReactNode[];
  shouldRender?: boolean;
};

export const CustomFormSection = ({
  headerTitle,
  children,
  shouldRender = true,
}: ResponseFormSectionType) => {
  if (!shouldRender) {
    return null;
  }

  return (
    <section className="flex flex-col mb-4">
      <h2 className="font-bold text-xl text-neutral600 mb-2">{headerTitle}</h2>
      <div className="flex justify-between w-full items-center">{children}</div>
    </section>
  );
};
