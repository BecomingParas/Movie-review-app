import { FC } from "react";
import { useFormContext } from "react-hook-form";
interface CheckboxGroupFieldProps {
  label: string;
  name: string;
  options: string[];
  className?: string;
}

export const CheckboxGroupField: FC<CheckboxGroupFieldProps> = ({
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
      <label className=" text-white block mb-2">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 bg-gray-700 p-2 rounded"
          >
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="w-4 h-4"
            />
            <span className="text-white">{option}</span>
          </label>
        ))}
      </div>
      {fieldError && (
        <p className="text-red-400 mt-2">{fieldError.message as string}</p>
      )}
    </div>
  );
};
