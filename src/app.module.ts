import { ProductModule } from './features/products/web/ProductModule';
import { BlogModule } from './features/blogs/web/BlogModule';
import { FaqModule } from './features/freqAskedQuens/web/FaqModule';
import { TestimonyModule } from './features/testimonials/web/TestimonyModule';
import { AppController } from './app.controller';
import { UserModule } from './features/user/web/UserModule';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MemberModule } from './features/members/web/MemberModule';
import { StateModule } from './features/states/web/StateModule';
import { CurrencyModule } from './features/curriencies/web/CurrencyModule';
import { TagModule } from './features/tags/web/TagModule';
import { ProductReviewModule } from './features/product_reviews/web/ProductReviewModule';
import { ProductDiscountModule } from './features/product_discounts/web/ProductDiscountModule';
import { WishlistModule } from './features/wishlists/web/wishlistModule';
import { OrderModule } from './features/orders/web/OrderModule';
import { TaxModule } from './features/taxes/web/TaxModule';
import { PaymentAddressModule } from './features/payments/payment_addresses/web/PaymentAddressModule';
import { PaymentMethodModule } from './features/payments/payment_methods/web/PaymentMethodModule';
import { ShippingAddressModule } from './features/shipping/shipping_addresses/web/ShippingAddressModule';

@Module({
  imports: [
    ProductModule,
    FaqModule,
    TestimonyModule,
    BlogModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    MemberModule,
    StateModule,
    CurrencyModule,
    TagModule,
    ProductReviewModule,
    ProductDiscountModule,
    WishlistModule,
    OrderModule,
    TaxModule,
    PaymentAddressModule,
    PaymentMethodModule,
    ShippingAddressModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
