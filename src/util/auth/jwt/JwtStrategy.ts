/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticatedUser } from '../../../features/user/domain/AuthenticatedUser'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtSecretTest101',
    });
  }

  validate(payload: any) : any {
    const userPayload = payload
    const user = AuthenticatedUser.getInstance()
    user.email = userPayload.email
    user.userId = userPayload.userId
    user.role = userPayload.role
    if (userPayload.shopId)
        user.shopId = userPayload.shopId
    return payload
  }


}
