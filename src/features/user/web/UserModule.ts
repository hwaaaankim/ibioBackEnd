import { UserController } from './UserController';
import { TypeOrmConfig } from '../../../database/config/TypeOrmConfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/';
import { JwtStrategy } from '../../../util/auth/jwt/JwtStrategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret:  'jwtSecretTest101',
            signOptions: {
                expiresIn: '12h',
            }
        })
    ],
    controllers: [ UserController ],
    providers: [ JwtStrategy ],
    exports: [ PassportModule ]
})
export class UserModule {}
