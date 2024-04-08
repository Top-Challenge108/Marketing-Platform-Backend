import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTokenEntity } from '../entities/user-token.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserTokenEntity)
    private userTokenRepository: Repository<UserTokenEntity>,
  ) {}

  async createToken(params: {
    userId: string;
    expiredDate: Date;
    deviceInfo?: any;
  }) {
    const { userId, expiredDate } = params;

    const tokenEntity = this.userTokenRepository.create({
      isRevoked: false,
      userId,
      expiredDate,
    });

    return this.userTokenRepository.save(tokenEntity);
  }

  async revokeToken(id: string) {
    const token = await this.userTokenRepository.findOneBy({
      id,
    });

    if (!token) {
      throw new NotFoundException();
    }

    token.isRevoked = true;

    return this.userTokenRepository.save(token);
  }

  async revokeTokenOfUser(id: string) {
    const tokens = await this.userTokenRepository.findBy({
      userId: id,
    });

    if (!tokens.length) {
      throw new NotFoundException();
    }
    for (const token of tokens) {
      token.isRevoked = true;
    }

    return this.userTokenRepository.save(tokens);
  }

  findOne(id: string) {
    return this.userTokenRepository.findOneBy({
      id,
    });
  }
}
