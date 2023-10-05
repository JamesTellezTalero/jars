import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  return {
    database: {
      type: process.env.DATABASE_TYPE,
      username: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
    },
  };
});
