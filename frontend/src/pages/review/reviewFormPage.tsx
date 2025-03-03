import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movieService } from "../../service/movieService";

interface FormData {
  content: string;
  rating: number;
}

export default function ReviewFormPage() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (reviewData: FormData) =>
      movieService.createReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies", id] });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <textarea
            {...register("content", { required: "Review content is required" })}
            className="w-full p-2 border rounded"
            rows={4}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
