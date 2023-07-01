import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { UserEntity } from '@modules/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOrCreate({ email, name, ...user }: IAuthUser): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { email, name },
    });

    if (foundUser) return foundUser;

    return this.createUser({ email, name, ...user });
  }

  private createUser({ email, name }: IAuthUser): Promise<UserEntity> {
    return this.userRepository.save({
      email,
      name,
    });
  }
}
