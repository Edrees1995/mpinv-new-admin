import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ApiController } from './api.controller';
import { SettingsApiService } from './services/settings-api.service';
import { ReferenceApiService } from './services/reference-api.service';
import { ContentApiService } from './services/content-api.service';
import { ListingsApiService } from './services/listings-api.service';
import { FormsApiService } from './services/forms-api.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ApiController],
  providers: [
    SettingsApiService,
    ReferenceApiService,
    ContentApiService,
    ListingsApiService,
    FormsApiService,
  ],
})
export class ApiModule {}
