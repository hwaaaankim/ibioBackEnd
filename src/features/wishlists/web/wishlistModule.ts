import { Module } from '@nestjs/common';
import { WishlistController } from './WishlistController';

@Module({
  imports: [],
  controllers: [WishlistController],
  providers: [],
})
export class WishlistModule {}
