export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  content: string;
  rating: number;
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
