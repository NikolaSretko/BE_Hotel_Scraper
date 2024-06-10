import User from "../../DAO/models/User.js";
// import { sendVerificationEmail } from "../../utils/verificationEmail.js";

interface RegisterUserParams {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  birthday: string;
}

export async function registerUser({
  firstname,
  lastname,
  username,
  email,
  password,
  birthday,
}: RegisterUserParams) {
  const foundUser = await User.findByEmail(email);
  if (foundUser) throw new Error("User with this Email already exist");
  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    birthday,
  });
  // await sendVerificationEmail(user);
  return user.toProfileInfo();
}