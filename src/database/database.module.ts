import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './dbConfig';
import { ConfigType } from '@nestjs/config';

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
          entities: [],
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
