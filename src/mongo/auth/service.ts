import { InvalidMovieReviewPayload } from "../../services/movie-review-errors";

import { UserModel } from "./model";

type TCreateUserInput = {
  id: string;
  username: string;
  email: string;
  password: string;
};

// create user
async function createUser(input: Omit<TCreateUserInput, "id">) {
  const user = new UserModel({
    username: input.username,
    password: input.password,
    email: input.email,
  });
  await user.save();
}
type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateUserId);
  if (!user) {
    throw new Error("User not found");
  }
  await UserModel.replaceOne(
    {
      _id: toUpdateUserId,
    },
    {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  );
}
// delete user

async function deleteUser(toDeleteUserId: string) {
  const user = await UserModel.findByIdAndDelete(toDeleteUserId);
  if (!user) {
    throw InvalidMovieReviewPayload;
  }
  await UserModel.deleteOne({
    _id: toDeleteUserId,
  });
  return user;
}

// getAllUser

async function getAllUser() {
  const users = await UserModel.find();
  return users;
}

// getUserById

async function getUserById(toGetUserId: string) {
  const user = await UserModel.findById(toGetUserId);
  if (!user) {
    throw new Error("user not found");
  }
  return user;
}
// getUserByEmail

async function getUserByEmail(email: string) {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export const userMongoService = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
};
