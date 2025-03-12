import { FC } from "react";
import { useFormContext } from "react-hook-form";
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
}
export const InputField: FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  name,
}) => {
  const { register } = useFormContext();
  return (
    <div>
      <label className=" block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-b-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
        {...register(name)}
      />
    </div>
  );
};
