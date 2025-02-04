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

export const userMongoService = {
  createUser,
  updateUser,
};
