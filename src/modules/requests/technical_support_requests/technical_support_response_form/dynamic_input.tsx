import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

const generateInput = (props: DynamicInputProps) => {
  switch (props.name) {
    case "technicalDocumentation":
      return (
        <Input
          className="bg-bgPrimary border-2 border-red-700"
          type="file"
          required
          {...props}
        />
      );

    default:
      return (
        <Input
          className="bg-bgPrimary border-red-700"
          type="text"
          required
          {...props}
        />
      );
  }
};

type DynamicInputProps = InputHTMLAttributes<HTMLInputElement>;

export const DynamicInput = ({ ...props }: DynamicInputProps) => {
  return generateInput(props);
};
