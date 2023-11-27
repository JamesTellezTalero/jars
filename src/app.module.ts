import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JarsModule } from './jars/jars.module';
import { MovementsModule } from './movements/movements.module';
import { MovementTypesModule } from './movement-types/movement-types.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { GeneralModuleModule } from './general-module/general-module.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import dbConfig from './database/dbConfig';

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
    UsersModule,
    JarsModule,
    MovementsModule,
    MovementTypesModule,
    DatabaseModule,
    TagsModule,
    GeneralModuleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
