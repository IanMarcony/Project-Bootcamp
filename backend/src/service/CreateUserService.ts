import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";
import AppError from "../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserSerice {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError("Email address already exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
