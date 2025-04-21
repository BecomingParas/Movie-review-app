import { FC } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  className?: string;
}
export const InputField: FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  name,
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = !!errors[name];
  return (
    <div>
      <label className=" block text-sm font-medium mb-1 text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "w-full px-4 py-2 border  rounded-md focus:ring-2  focus:outline-none transition duration-150",
          hasError
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-gray-500",
          className
        )}
        {...register(name)}
      />
      {hasError && (
        <p className="text-red-700 bg-red-200 p-2 rounded-md mt-2">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
