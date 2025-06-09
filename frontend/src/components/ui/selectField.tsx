import { FC } from "react";
import { useFormContext } from "react-hook-form";
interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  className?: string;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];
  return (
    <div className={className}>
      <label className=" text-black dark:text-white bg-pink-100 block mb-2">
        {label}
      </label>
      <select
        {...register(name)}
        className="w-full p-4  bg-pink-200 dark:bg-gray-700 rounded "
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace("_", " ").toLocaleUpperCase()}
          </option>
        ))}
      </select>
      {fieldError && (
        <p className="text-red-400 mt-2">{fieldError.message as string}</p>
      )}
    </div>
  );
};
