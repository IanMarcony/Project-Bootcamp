import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '123456789',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fulano@detal.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
