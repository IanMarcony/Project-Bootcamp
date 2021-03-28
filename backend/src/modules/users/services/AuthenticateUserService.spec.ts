import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '123456789',
    });
    const response = await authenticateUser.execute({
      email: 'fulano@detal.com',
      password: '123456789',
    });
    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with no existing user through email', async () => {
    expect(
      authenticateUser.execute({
        email: 'fulano2@detal.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    expect(
      authenticateUser.execute({
        email: 'fulano@detal.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
