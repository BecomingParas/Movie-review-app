import { movieSchema } from "@/lib/movieSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { InputField } from "../ui/InputField";
import { CheckboxGroupField } from "../ui/CheckboxGroupField";
import { SelectField } from "../ui/selectField";
type TMovieForm = z.infer<typeof movieSchema>;
const genreOptions = [
  "Action",
  "Romantic",
  "Sci-Fi",
  "Drama",
  "Horror",
  "Comedy",
];

const categoryOptions = ["featured", "trending_now", "top_rated"];

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-6 bg-gray-800 p-8 rounded-xl shadow-xl"
        >
          <div>
            <InputField
              label="Title: "
              type="text"
              name="title"
              className=" text-white block mb-2"
            />
          </div>
          <div>
            <InputField
              label="Description:"
              type="text"
              name="description"
              className=" text-white block mb-2"
            />
          </div>
          <div>
            <CheckboxGroupField
              label="Genres:"
              name="genre"
              options={genreOptions}
              className="mb-4"
            />
          </div>
          <div>
            <SelectField
              label="Category:"
              name="category"
              options={categoryOptions}
              className="mb-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <InputField
                label="Director:"
                name="director"
                type="text"
                className="w-full p-3 bg-gray-700 text-white rounded"
              />
            </div>
            <div>
              <InputField
                label="Release Year:"
                name="release_year"
                type="number"
                className="w-full p-3 bg-gray-700 text-white rounded"
                defaultValueProp="2020"
              />
            </div>
            <div>
              <InputField
                label="Average Rating:"
                type="number"
                stepValueProp="0.1"
                name="average_rating"
                className="w-full p-3 bg-gray-700 text-white rounded"
              />
            </div>
          </div>
          <div></div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateMovie;
