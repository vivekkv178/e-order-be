import { Module } from '@nestjs/common';
import { DocsModule } from './docs/docs.module';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import databases, { DATABASE_OPENAPI } from './core/config/databases';
import { OpenApiModule } from './openapi/openapi.module';
import { AllExceptionFilter } from './core/filters/all-exception-filter';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
