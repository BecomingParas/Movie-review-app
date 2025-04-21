import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
interface DynamicInputListFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}
export const DynamicInputListField: FC<DynamicInputListFieldProps> = ({
  label,
  name,
  className = "",
  placeholder,
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, remove, append } = useFieldArray({ control, name });
  const fieldError = errors[name];
  return (
    <div className={className}>
      <label className="text-white block mb-2">{label}</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="flex-1 p-3 bg-gray-700 text-white rounded"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-600 px-3 py-2 rounded text-white"
            disabled={}
          >
            Remove
          </button>
          <button cl>Add {label}</button>
        </div>
      ))}
    </div>
  );
};
