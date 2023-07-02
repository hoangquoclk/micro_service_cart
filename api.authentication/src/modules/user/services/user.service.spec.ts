import { Test } from '@nestjs/testing';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { UserTestModule } from '../../../../test/modules/user-test.module';
import { UserService } from './user.service';
import { BcryptHash } from '@shared/utils/bcrypt-hash.shared';
import { AppError } from '@shared/errors/app.error';
import { HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  const refreshToken = 'refresh-token';
  const accessToken = 'access-token';

  const user = {
    id: 1,
    name: 'test',
    email: 'test@email.com',
    password: '123',
  };

  let authenticationService: AuthenticationService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserTestModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('should be able to create a user', async () => {
      const password = await BcryptHash.hashPassword(user.password);

      jest
        .spyOn(BcryptHash, 'hashPassword')
        .mockReturnValueOnce(new Promise((resolve) => resolve(password)));

      const spy = jest.spyOn((userService as any).userRepository, 'create');

      await userService.create({ ...user });

      expect(spy).toBeCalledWith({
        name: user.name,
        email: user.email,
        password,
      });
    });

    it('should not be able to create a user if the email already exists', async () => {
      jest
        .spyOn((userService as any).userRepository, 'findOne')
        .mockReturnValueOnce(user);

      await expect(userService.create({ ...user })).rejects.toThrowError(
        new AppError(
          HttpStatus.CONFLICT,
          'Already exists a user with this email!',
        ),
      );
    });
  });

  describe('login', () => {
    it('should be able to login and get the token response', async () => {
      jest
        .spyOn((userService as any).userRepository, 'findOne')
        .mockReturnValueOnce(user);

      jest
        .spyOn(BcryptHash, 'verifyPassword')
        .mockReturnValueOnce(new Promise((resolve) => resolve(true)));

      jest
        .spyOn(authenticationService, 'signIn')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve({ refreshToken, accessToken })),
        );

      const response = await userService.login({ ...user });

      expect(response).toStrictEqual({ refreshToken, accessToken });
    });

    it('should not be able to login if the user does not exists', async () => {
      jest
        .spyOn((userService as any).userRepository, 'findOne')
        .mockReturnValueOnce(user);

      jest
        .spyOn(BcryptHash, 'verifyPassword')
        .mockReturnValueOnce(new Promise((resolve) => resolve(false)));

      await expect(userService.login({ ...user })).rejects.toThrowError(
        new AppError(HttpStatus.UNAUTHORIZED),
      );
    });

    it('should not be able to login if the user password is incorrect', async () => {
      await expect(userService.login({ ...user })).rejects.toThrowError(
        new AppError(HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('delete', () => {
    it('should be able to delete the current user', async () => {
      jest
        .spyOn((userService as any).userRepository, 'findOne')
        .mockReturnValueOnce(user);

      const spy = jest.spyOn(userService as any, 'getKey');

      await userService.delete(user.email);
      expect(spy).toBeCalledTimes(1);
    });

    it('should not be able to delete a user that does not exists', async () => {
      await expect(userService.delete(user.email)).rejects.toThrowError(
        new AppError(HttpStatus.NOT_FOUND, 'User not found!'),
      );
    });
  });
});
