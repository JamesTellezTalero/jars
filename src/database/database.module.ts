import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './dbConfig';
import { ConfigType } from '@nestjs/config';
import { Users } from './entities/Users';
import { Jars } from './entities/Jars';
import { Movements } from './entities/Movements';
import { MovementTypes } from './entities/MovementTypes';
import { Tags } from './entities/Tags';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (configS: ConfigType<typeof dbConfig>) => {
        const { username, host, database, password, port } = configS.database;
        return {
          type: 'postgres',
          database,
          username,
          password,
          host,
          port,
          synchronize: false,
          autoLoadEntities: true,
          migrationsTableName: 'migrations',
          entities: [Jars, Movements, MovementTypes, Tags, Users],
          migrations: [],
          subscribers: [],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [TypeOrmModule],
})
export class DatabaseModule {}
