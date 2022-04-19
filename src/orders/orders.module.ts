import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { OrdersSubscriber } from './orders.subscriber';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersSubscriber],
  imports: [
    MikroOrmModule.forFeature({
      entities: [Order, Customer],
    }),
  ],
})
export class OrdersModule {}
