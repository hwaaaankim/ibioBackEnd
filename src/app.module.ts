import { ProductModule } from './features/products/web/ProductModule';
import { AppController } from './app.controller';
import { UserModule } from './features/user/web/UserModule';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ProductModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
