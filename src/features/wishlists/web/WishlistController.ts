import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { WishlistDto } from '../data/dtos/WishlistDto';
import { WishlistService } from '../domain/WishListService';
import { Role } from '../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(WishlistDto)
@Controller('wishlists')
export class WishlistController {
  wishlistService: WishlistService;

  constructor() {
    this.wishlistService = new WishlistService();
    this.wishlistService.repository = DatabaseFactory.getRepository('Wishlist');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addWishlist(@Body() newWishlist: WishlistDto) {
    return this.wishlistService.addWishlist(newWishlist);
  }

  @Get(':id')
  getWishlist(@Param('id') wishlistId: string): any {
    return this.wishlistService.getWishlist(wishlistId);
  }

  @Get()
  getWishlists(): any {
    return this.wishlistService.getWishlists();
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteWishlist(@Param('id') wishlistId: string): any {
    return this.wishlistService.deleteWishlist(wishlistId);
  }
}
