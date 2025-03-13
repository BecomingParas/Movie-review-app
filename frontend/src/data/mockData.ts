// import { Movie, Review, User } from "@/types";

// export const mockMovies: Movie[] = [
//   {
//     id: "1",
//     title: "Inception",
//     description:
//       "A thief who steals corporate secrets through dream-sharing technology.",
//     releaseDate: "2010-07-16",
//     rating: 4.8,
//     imageUrl: "https://example.com/inception.jpg",
//     genre: ["Action", "Sci-Fi"],
//     director: "Christopher Nolan",
//     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
//     plot: "A thief who steals corporate secrets through dream-sharing technology.",
//   },
// ];

// export const mockReviews: Review[] = [
//   {
//     id: "1",
//     movieId: "1",
//     userId: "1",
//     username: "John Doe",
//     userAvatar: "https://example.com/avatar.jpg",
//     rating: 5,
//     comment: "Amazing movie!",
//     createdAt: "2024-01-01",
//     likes: 10,
//   },
// ];

// export const mockUsers: User[] = [
//   {
//     id: "1",
//     username: "John Doe",
//     email: "john@example.com",
//     avatar: "https://example.com/avatar.jpg",
//   },
// ];

// export const paginateArray = <T>(array: T[], page: number, limit: number) => ({
//   data: array.slice((page - 1) * limit, page * limit),
//   total: array.length,
//   page,
//   limit,
// });

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  cast: string[];
  plot: string;
}

export const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    posterUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2000",
    rating: 7.6,
    year: 2022,
    runtime: 192,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    plot: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
  },
  {
    id: 2,
    title: "Inception",
    posterUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    posterUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 9.3,
    year: 1994,
    runtime: 142,
    genres: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 4,
    title: "The Dark Knight",
    posterUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 9.0,
    year: 2008,
    runtime: 152,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    posterUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.9,
    year: 1994,
    runtime: 154,
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 6,
    title: "The Godfather",
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 9.2,
    year: 1972,
    runtime: 175,
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
];

export const topRatedMovies: Movie[] = [
  {
    id: 7,
    title: "Forrest Gump",
    posterUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.8,
    year: 1994,
    runtime: 142,
    genres: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    plot: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  },
  {
    id: 8,
    title: "The Matrix",
    posterUrl:
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.7,
    year: 1999,
    runtime: 136,
    genres: ["Action", "Sci-Fi"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 9,
    title: "Goodfellas",
    posterUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.7,
    year: 1990,
    runtime: 146,
    genres: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
  },
  {
    id: 11,
    title: "Avatar",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
    backdropUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-2009-film.jpg",
    rating: 7.9,
    year: 2009,
    runtime: 162,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    plot: "A paraplegic Marine is sent to the moon Pandora on a unique mission but becomes torn between following orders and protecting the world he feels is his home.",
  },
  {
    id: 11,
    title: "The Silence of the Lambs",
    posterUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.6,
    year: 1991,
    runtime: 118,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
  },
];

export const recentMovies: Movie[] = [
  {
    id: 12,
    title: "Dune",
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 8.0,
    year: 2021,
    runtime: 155,
    genres: ["Action", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    plot: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
  },
  {
    id: 13,
    title: "No Time to Die",
    posterUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 7.3,
    year: 2021,
    runtime: 163,
    genres: ["Action", "Adventure", "Thriller"],
    director: "Cary Joji Fukunaga",
    cast: ["Daniel Craig", "Ana de Armas", "Rami Malek"],
    plot: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
  },
  {
    id: 14,
    title: "The Power of the Dog",
    posterUrl:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 6.9,
    year: 2021,
    runtime: 126,
    genres: ["Drama", "Romance", "Western"],
    director: "Jane Campion",
    cast: ["Benedict Cumberbatch", "Kirsten Dunst", "Jesse Plemons"],
    plot: "Charismatic rancher Phil Burbank inspires fear and awe in those around him. When his brother brings home a new wife and her son, Phil torments them until he finds himself exposed to the possibility of love.",
  },
  {
    id: 15,
    title: "The French Dispatch",
    posterUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: 7.1,
    year: 2021,
    runtime: 107,
    genres: ["Comedy", "Drama", "Romance"],
    director: "Wes Anderson",
    cast: ["Benicio Del Toro", "Adrien Brody", "Tilda Swinton"],
    plot: "A love letter to journalists set in an outpost of an American newspaper in a fictional twentieth century French city that brings to life a collection of stories published in 'The French Dispatch Magazine'.",
  },
  {
    id: 18,
    title: "Interstellar",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    backdropUrl:
      "https://wallpapers.com/images/hd/interstellar-space-movie-background-z3mceqrkjykhuvhm.jpg",
    rating: 8.7,
    year: 2014,
    runtime: 169,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    plot: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.",
  },
];

export function getMovieById(id: number): Movie | undefined {
  return [...featuredMovies, ...topRatedMovies, ...recentMovies].find(
    (movie) => movie.id === id
  );
}
