import { TokenModel } from "../../model/token.model";

type TCreateTokenInput = {
  userId: string;
  token: string;
};

// create a token

async function createToken(input: TCreateTokenInput) {
  const token = new TokenModel({
    user_id: input.userId,
    token: input.token,
  });
  await token.save();
}

type TDeleteTokenInput = {
  token: string;
  userId: string;
};

//delete a token

async function deleteToken(input: TDeleteTokenInput) {
  await TokenModel.deleteOne({
    user_id: input.userId,
    token: input.token,
  });
}

// get Token

async function getToken(input: { token: string }) {
  const token = await TokenModel.findOne({
    token: input.token,
  });
  return token;
}

export const tokenService = {
  createToken,
  deleteToken,
  getToken,
};
