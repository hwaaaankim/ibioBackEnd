import { WishlistDto } from '../data/dtos/WishlistDto';
import { Wishlist } from './WishList';

export class WishlistService implements Wishlist {
  repository: Wishlist;

  addWishlist(newWishlist: WishlistDto): boolean {
    return this.repository.addWishlist(newWishlist);
  }
  getWishlist(wishlistId: string): any {
    return this.repository.getWishlist(wishlistId);
  }
  getWishlists(): any {
    return this.repository.getWishlists();
  }
  deleteWishlist(wishlistId: string): boolean {
    return this.repository.deleteWishlist(wishlistId);
  }
}
