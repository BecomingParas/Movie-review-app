import { movieSchema } from "@/lib/movieSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  return (
    <div className="min-h-screen pt-18 p-6 max-w-2xl mx-auto">
      <div className=" flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white ">Create New Movie</h1>
      </div>
    </div>
  );
};

export default CreateMovie;
