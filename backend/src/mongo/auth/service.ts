import { UserModel } from "./model";

type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};

type TUpdateUserInput = Partial<TCreateUserInput>;
// Create user

async function createUser(input: TCreateUserInput) {
  const user = new UserModel({
    username: input.username,
    email: input.email,
    password: input.password,
  });
  const createdUser = await user.save();
  return createdUser;
}
// updated user
async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateUserId);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(toUpdateUserId, input, {
    new: true,
  });
  return updatedUser;
}

// Get all users
async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}
// Get user by id

async function getUserById(toGetUserId: string) {
  const user = await UserModel.findById(toGetUserId);
  if (!user) {
    throw new Error("User not found");
  }
}

// Delete user
async function deleteUser(toDeleteUserId: string) {
  const user = await UserModel.findByIdAndDelete(toDeleteUserId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

//Get user by email
async function getUserByEmail(input: { email: string }) {
  const user = await UserModel.findOne({ email: input.email });
  return user;
}

//Final export

export const userMongoService = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByEmail,
};
