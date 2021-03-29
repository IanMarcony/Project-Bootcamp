import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (!checkUserExist) {
      throw new AppError('Email address does not exist');
    }
    await this.mailProvider.sendMail(email, 'recover your password');
  }
}
