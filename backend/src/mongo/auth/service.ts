import { InvalidMovieReviewPayload } from "../../services/movie-review-errors";
import { UserModel } from "./model";
type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};

//create users

async function createUser(input: TCreateUserInput) {
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

// update the user

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateUserId);
  if (!user) {
    throw new Error("User not found");
  }

  await UserModel.replaceOne(
    // updateOne is another method
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

//get all users
async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

// get by id user
async function getUserById(toGetUserId: string) {
  const user = await UserModel.findById(toGetUserId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// deleteUsers
async function deleteUser(toDeleteUserId: string) {
  const user = await UserModel.findByIdAndDelete(toDeleteUserId);
  //   await UserModel.deleteOne({ _id: toDeleteUserId });
  if (!user) {
    throw InvalidMovieReviewPayload;
  }

  return user;
}

async function getUserByEmail(input: { email: string }) {
  const user = await UserModel.findOne({
    email: input.email,
  });
  return user;
}

export const userMongoService = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByEmail,
};
