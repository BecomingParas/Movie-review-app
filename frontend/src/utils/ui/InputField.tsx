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
      <label className=" block font-medium">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border rounded "
      />
      {errors[name] && <p>{errors[name]?.message as string}</p>}
    </div>
  );
};
