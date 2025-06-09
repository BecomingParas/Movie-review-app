import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FileUploadFieldProps {
  name: string;
  label: string;
  accept?: string;
  className?: string;
}

export const FileUploadField: FC<FileUploadFieldProps> = ({
  name,
  label,
  accept,
  className = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-8 mb-2">
        <label className="block text-sm font-medium  flex-shrink-0">
          {label}
        </label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept={accept}
              onChange={(e) => field.onChange(e.target.files)}
              className=" flex-1 border border-gray-600 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium bg-pink-200 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          )}
        />
      </div>
      {fieldError && (
        <p className="text-red-400 mt-2 ">{String(fieldError.message)}</p>
      )}
    </div>
  );
};
