import { Module } from '@nestjs/common';
import { DocsModule } from './docs/docs.module';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databases, { DATABASE_OPENAPI } from './core/config/databases';
import { OpenApiModule } from './openapi/openapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databases],
    }),
    TypeOrmModule.forRootAsync({
      name: DATABASE_OPENAPI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('databases.openapi'),
    }),
    CoreModule,
    DocsModule,
    OpenApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
