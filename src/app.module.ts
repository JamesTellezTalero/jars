import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JarsModule } from './jars/jars.module';
import { MovementsModule } from './movements/movements.module';
import { MovementTypesModule } from './movement-types/movement-types.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/jars'), UsersModule, JarsModule, MovementsModule, MovementTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
