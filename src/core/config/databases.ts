import { registerAs } from '@nestjs/config';
import { join } from 'path';

export const DATABASE_OPENAPI = 'openapi';

export default registerAs('databases', () => ({
  openapi: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: DATABASE_OPENAPI,
    port: parseInt(process.env.TYPEORM_PORT, 0) || 5432,
    logging: process.env.TYPEORM_LOGGING === 'true' || false,
    extra: {
      max: 10,
    },
    entities: [join(__dirname, '..', '..', 'openapi', 'entities', '*.{ts,js}')],
    migrations: [join(__dirname, '..', 'migrations', 'openapi', '*.{ts,js}')],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true' || false,
    migrationsTableName: 'nestjs_migrations',
    autoMigrationsRun: true,
    ssl: process.env.TYPEORM_SSL === 'true' || false,
  },
}));
