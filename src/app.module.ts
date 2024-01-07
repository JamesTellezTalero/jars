import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { CuteOffDateCronModule } from './cute-off-date-cron/cute-off-date-cron.module';
import dbConfig from './database/dbConfig';
import { DatabaseModule } from './database/database.module';
import { GeneralModuleModule } from './general-module/general-module.module';
import { JarsModule } from './jars/jars.module';
import { JarsStadisticsModule } from './jars-stadistics/jars-stadistics.module';
import { MovementsModule } from './movements/movements.module';
import { MovementTypesModule } from './movement-types/movement-types.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'process.env',
      load: [dbConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        PASSWORD_SECRET_ENC_KEY: Joi.string().required(),
      }),
    }),
    MulterModule.register({
      dest: './src/assets/UserImgs',
    }),
    AuthModule,
    CuteOffDateCronModule,
    DatabaseModule,
    GeneralModuleModule,
    JarsModule,
    JarsStadisticsModule,
    MovementsModule,
    MovementTypesModule,
    TagsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
