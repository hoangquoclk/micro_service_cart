import { Inject, Injectable, CACHE_MANAGER, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { ITokenResponse } from '@modules/authentication/interfaces';
import { RegisterUserDto, LoginDto } from '@modules/user/dtos';
import { BcryptHash } from '@shared/utils/bcrypt-hash.shared';
import { USER_REPOSITORY } from '@shared/constants/constants';
import { User } from '@modules/user/models/user.model';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class UserService {
  private readonly twentyFourHours = parseInt(process.env.TTL_TIME) ?? 86460;
  private readonly cachePrefix = 'auth';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,

    private readonly authenticationService: AuthenticationService,
  ) {}

  async create({ email, name, password }: RegisterUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a user with this email!',
      );
    }

    password = await BcryptHash.hashPassword(password);

    await this.userRepository.create({
      email,
      name,
      password,
    });

    const key = this.getKey(email);

    await this.cacheManager.set(key, { user }, this.twentyFourHours);
  }

  async login({ email, password }: LoginDto): Promise<ITokenResponse> {
    const key = this.getKey(email);

    const cachedUser = (await this.cacheManager.get(key)) as { user: User };
    let foundUser: User = cachedUser?.user;

    if (!foundUser) {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new AppError(HttpStatus.UNAUTHORIZED);
      }

      const isSamePassword = await BcryptHash.verifyPassword(
        password,
        user.password,
      );

      if (!isSamePassword) {
        throw new AppError(HttpStatus.UNAUTHORIZED);
      }

      await this.cacheManager.set(key, { user }, this.twentyFourHours);

      foundUser = user;
    }

    const { accessToken, refreshToken } =
      await this.authenticationService.signIn(foundUser);

    return { accessToken, refreshToken };
  }

  async delete(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found!');
    }

    await this.userRepository.destroy({
      where: { email, id: user.id },
      force: false,
    });

    const key = this.getKey(email);

    await this.cacheManager.del(key);
  }

  private getKey(email: string): string {
    return `${this.cachePrefix}-${email}`;
  }
}
