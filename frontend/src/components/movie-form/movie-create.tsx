import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputField } from "../ui/InputField";
import { env } from "@/utils/config";

interface MovieFormProps {
  initialValues?: any;
  onSuccess?: () => void;
}

const MovieForm: FC<MovieFormProps> = ({ initialValues, onSuccess }) => {
  const methods = useForm({
    defaultValues: initialValues || {
      title: "",
      description: "",
      genre: "",
      release_year: "",
    },
  });

  const queryClient = useQueryClient();

  const createMovie = async (data: any) => {
    const res = await fetch(`${env.BACKEND_URL}/api/movies/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to create movie");

    return res.json();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      methods.reset();
      onSuccess?.();
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md">
        <InputField label="Title" name="title" placeholder="Movie Title" />
        <InputField
          label="Description"
          name="description"
          placeholder="Movie Description"
        />
        <InputField label="Genre" name="genre" placeholder="Action, Comedy" />
        <InputField
          label="Release Year"
          name="release_year"
          type="number"
          placeholder="2024"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </form>
    </FormProvider>
  );
};

export default MovieForm;
