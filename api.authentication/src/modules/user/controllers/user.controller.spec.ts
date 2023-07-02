// TO DO: add supertest

import { Test } from '@nestjs/testing';

import { UserTestModule } from '../../../../test/modules/user-test.module';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { LoginDto, RegisterUserDto } from '@modules/user/dtos';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserTestModule],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be able to create a user', async () => {
    const dto: RegisterUserDto = {
      email: 'email@test.com',
      name: 'name',
      password: 'password',
    };

    const spy = jest.spyOn(userService, 'create');
    jest.spyOn(userService, 'create').mockImplementation(jest.fn());

    await userController.register(dto);

    expect(spy).toBeCalledWith({ ...dto });
  });

  it('should be able to login', async () => {
    const dto: LoginDto = {
      email: 'email',
      password: 'password',
    };

    const spy = jest.spyOn(userService, 'login');
    jest.spyOn(userService, 'login').mockImplementation(jest.fn());

    await userController.login(dto);

    expect(spy).toBeCalledWith({ ...dto });
  });

  it('should be able to delete', async () => {
    const dto: IAuthUser = {
      sub: 1,
      name: 'name',
      email: 'email',
      iat: 1,
      exp: 1,
    };

    const spy = jest.spyOn(userService, 'delete');
    jest.spyOn(userService, 'delete').mockImplementation(jest.fn());

    await userController.delete(dto);

    expect(spy).toBeCalledWith(dto.email);
  });
});
