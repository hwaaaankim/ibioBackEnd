import { AuthenticatedUser } from '../../../features/user/domain/AuthenticatedUser';
import { JwtService } from '@nestjs/jwt';

export class JwtSign {

  constructor(private jwtService: JwtService, private jwtPayload: any){}

  execute(): any {
  const access_token = this.jwtService.sign(this.jwtPayload);
    if( access_token) {
      const user = AuthenticatedUser.getInstance();
      user.fullName = this.jwtPayload.fullName
      user.email = this.jwtPayload.email
      user.userId = this.jwtPayload.userId
      user.role = this.jwtPayload.role
      console.log(this.jwtPayload);
      if (this.jwtPayload.shopId)
        user.shopId = this.jwtPayload.shopId
    }
    return access_token
  }

}