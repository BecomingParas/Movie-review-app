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
  placeholder = "Cast member name",
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
      <label className="block text-sm font-medium  mb-2">{label}</label>
      {castFields.map((field, index) => (
        <div key={field.id} className="flex gap-3 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="flex-1 px-4 bg-pink-200  py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => removeCast(index)}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            disabled={castFields.length === 1}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendCast("")}
        className="mt-2 px-4 py-2 bg-pink-200 hover:bg-pink-300 rounded-lg transition-colors"
      >
        Add Cast Member +
      </button>
      {fieldError && (
        <p className="text-red-400 mt-2">{String(fieldError?.message)}</p>
      )}
    </div>
  );
};
