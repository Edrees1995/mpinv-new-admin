import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { PropertiesModule } from './properties/properties.module';
import { ProjectsModule } from './projects/projects.module';
import { DevelopersModule } from './developers/developers.module';
import { CommunitiesModule } from './communities/communities.module';
import { SubCommunitiesModule } from './sub-communities/sub-communities.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'mpinv_new'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Set to false in production, we'll use migrations
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    DashboardModule,
    PropertiesModule,
    ProjectsModule,
    DevelopersModule,
    CommunitiesModule,
    SubCommunitiesModule,
    ApiModule,
  ],
})
export class AppModule {}
