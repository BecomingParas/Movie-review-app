import { FC } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

interface DynamicInputListFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export const DynamicInputListField: FC<DynamicInputListFieldProps> = ({
  name,
  label,
  placeholder = "Enter value",
  className = "",
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const {
    fields: castFields,
    remove: removeCast,
    append: appendCast,
  } = useFieldArray({
    control,
    name: "cast" as never,
  });

  const fieldError = errors[name];

  return (
    <div className={className}>
      <label className="block text-lg font-medium text-white mb-2">
        {label}
      </label>
      {castFields.map((field, index) => (
        <div key={field.id} className="flex gap-3 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="flex-1 p-3 bg-gray-700 text-white rounded"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => removeCast(index)}
            className="bg-red-600 px-3 py-2 rounded text-white"
            disabled={castFields.length === 1}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendCast("")}
        className="bg-blue-600 px-4 py-2 rounded text-white mt-2"
      >
        Add Cast Member +
      </button>
      {fieldError && (
        <p className="text-red-400 mt-2">{String(fieldError?.message)}</p>
      )}
    </div>
  );
};
