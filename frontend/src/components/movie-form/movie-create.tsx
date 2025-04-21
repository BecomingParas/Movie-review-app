import { movieSchema } from "@/lib/movieSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { data, Link } from "react-router-dom";
import { z } from "zod";
type TMovieForm = z.infer<typeof movieSchema>;

const CreateMovie = () => {
  const methods = useForm<TMovieForm>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      genre: [],
      cast: [""],
      title: "",
      description: "",
      director: "",
      release_year: 2024,
      average_rating: 5,
      category: "featured",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: TMovieForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
  };

  return (
    <div className="min-h-screen pt-20 p-6 max-w-2xl mx-auto">
      <div className=" flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white ">Create New Movie</h1>
        <Link
          to="/movies"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Bact to list
        </Link>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}></form>
      </FormProvider>
    </div>
  );
};

export default CreateMovie;
