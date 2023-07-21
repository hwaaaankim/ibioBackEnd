import { WishlistEntity } from './models/WishlistEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Wishlist } from '../domain/Wishlist';
import { WishlistDto } from './dtos/WishlistDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';
import { WishlistDetailEntity } from './models/WishListDetailEntity';

export class WishlistRepository implements Wishlist {
  entity: EntityClassOrSchema = WishlistEntity;
  wishlistRepository = AppDataSource.getRepository(this.entity);

  async addWishlist(newWishlist: WishlistDto): Promise<boolean> {
    try {
      const wishlist = new WishlistEntity();
      wishlist.productDetailId = newWishlist.productDetailId;
      wishlist.userId = newWishlist.userId;
      wishlist.quantity = newWishlist.quantity;
      wishlist.wishlistDate = new Date();
      await this.wishlistRepository.create(wishlist).save();
      newWishlist.options.forEach((op) => {
        const detail = new WishlistDetailEntity();
        detail.wishlistId = op.wishlistId;
        detail.productOptionId = op.productOptionId;
        AppDataSource.getRepository(WishlistDetailEntity).create(detail).save();
      });
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Wishlist already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getWishlist(wishlistId: string): Promise<any> {
    const Wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: ['details'],
    });
    if (!Wishlist) {
      throw new DataNotFoundException('Wishlist not dound');
    }
    return Wishlist;
  }

  async getWishlists(): Promise<any> {
    const wishlists = await this.wishlistRepository.find({
      relations: ['details'],
    });
    if (!wishlists)
      throw new DataNotFoundException('No Wishlists have been created yet');
    return wishlists;
  }

  async deleteWishlist(wishlistId: string): Promise<boolean> {
    const wishlist: WishlistEntity = await this.getWishlist(wishlistId);
    try {
      await wishlist.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
