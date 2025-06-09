import { env } from "process";

export type TReview = {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
};

export type TCreateReviewInput = {
  movieId: string;
  rating: number;
  comment: string;
};

export type TUpdateReviewInput = {
  reviewId: string;
  rating: number;
  comment: string;
};

export type TReviewResponse = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};

const getAuthToken = () => {
  const rawToken = localStorage.getItem("accessToken");
  if (!rawToken) throw new Error("");
  return rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
};

// to create review

export async function createReview(
  input: TCreateReviewInput
): Promise<TReviewResponse> {
  const res = await fetch(`${env.BACKEND_URL}/api/reviews/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(input),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create reveiw");
  return data;
}

// to update reveiw

export async function updateReview(
  input: TUpdateReviewInput
): Promise<TReviewResponse> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/reviews/update/${input.reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
      },
      credentials: "include",
      body: JSON.stringify(input),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update review");
  return data;
}

// to delete Review
export async function deleteReview(
  reviewId: string
): Promise<{ message: string; isSuccess: boolean }> {
  const res = await fetch(`${env.BACKEND_URL}/api/reviews/delete/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthToken(),
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete review");
  return data;
}
