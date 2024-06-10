import { UserService } from "../../service/index.ts";
import { registerUser } from "./user/registerUser.ts";
import { Request, Response } from 'express';

export const registerUserController = async (req: Request, res: Response) => {
  // Extract the necessary data from the request body
  const { username, email, password } = req.body;

  // Perform validation on the data

  // Check if the username is already taken

  // Check if the email is already registered

  // Hash the password --> erledigt unser model

  // Save the user to the database

  // Send a response indicating success or failure
  res.status(200).json({ message: 'User registered successfully' });
};

export async function registerUserCtrl(req:Request, res: Response) {
  try {
    const { username, email, password } = await UserService.regsiterUser(req.body);
    // Check if the user already exists
    const user
}