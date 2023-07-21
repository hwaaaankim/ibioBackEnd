import { WishlistDto } from '../data/dtos/WishlistDto';

export interface Wishlist {
  addWishlist(newWishlist: WishlistDto): any;
  getWishlist(wishlistId: string): any;
  getWishlists(): any;
  deleteWishlist(wishlistId: string): any;
}
