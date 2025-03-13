import { FC } from "react";
import { useFormContext } from "react-hook-form";
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}
export const InputField: FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-4">
      <label className=" block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors[name] && (
        <p className="text-red-700 bg-red-200 p-2 rounded-md mt-2">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
