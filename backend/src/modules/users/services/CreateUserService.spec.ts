import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Fulano de tal');
  });
  it('should not be able to create a new user with same email from latest user', async () => {
    await createUser.execute({
      name: 'Fulano de tal',
      email: 'fulano@detal.com',
      password: '123456789',
    });
    await expect(
      createUser.execute({
        name: 'Fulano de tal',
        email: 'fulano@detal.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
