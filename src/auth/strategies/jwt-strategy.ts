/* eslint-disable prettier/prettier */
import { JWT_SECRET } from './../../config/constants';
import { ConfigService } from '@nestjs/config';
import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(JWT_SECRET),
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;

    return await this.userService.getUserById(id);
  }
}
