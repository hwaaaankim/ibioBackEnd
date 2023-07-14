import { ProductModule } from './features/products/web/ProductModule';
import { AppController } from './app.controller';
import { UserModule } from './features/user/web/UserModule';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MemberModule } from './features/members/web/MemberModule';

@Module({
  imports: [
    ProductModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
