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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
