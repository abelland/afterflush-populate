import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { Customer } from './customers/entities/customer.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      metadataProvider: TsMorphMetadataProvider,
      entities: ['./dist/**/entities/*.entity.js'],
      entitiesTs: ['./src/**/entities/*.entity.ts'],
      type: 'sqlite',
      dbName: 'test.db',
      debug: true,
      // host: 'localhost',
      // port: 5432,
      // user: 'admin',
      // password: 'admin',
    }),
    MikroOrmModule.forFeature({
      entities: [Order, Customer],
    }),
    CustomersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
