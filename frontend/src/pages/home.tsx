import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for featured movies
  const featuredMovies = [
    {
      id: 1,
      title: "Inception",
      rating: 4.8,
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      year: "2010",
    },
    {
      id: 2,
      title: "The Dark Knight",
      rating: 4.9,
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      year: "2008",
    },
    {
      id: 3,
      title: "Interstellar",
      rating: 4.7,
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      year: "2014",
    },
    {
      id: 4,
      title: "The Matrix",
      rating: 4.6,
      image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      year: "1999",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg')",
            }}
          ></div>
          <div className="relative z-20 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover Amazing Movies
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your ultimate destination for movie reviews and ratings
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 transition-colors">
                  <FiSearch size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Movies Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{movie.year}</span>
                    <span className="text-yellow-400">★ {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Action",
              "Drama",
              "Sci-Fi",
              "Comedy",
              "Horror",
              "Romance",
              "Documentary",
              "Animation",
            ].map((category) => (
              <div
                key={category}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
