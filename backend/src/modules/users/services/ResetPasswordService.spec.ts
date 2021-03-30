import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const { id } = await fakeUsersRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '12346789',
    });
    const { token } = await fakeUserTokensRepository.generate(id);

    await resetPassword.execute({
      password: 'blablabla',
      token,
    });

    const userUpdated = await fakeUsersRepository.findById(id);

    expect(generateHash).toBeCalled();
    expect(userUpdated?.password).toBe('blablabla');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: 'blablabla',
        token: 'non-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPassword.execute({
        password: 'blablabla',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '12346789',
    });
    const { token } = await fakeUserTokensRepository.generate(id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'blablabla',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
