import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersController } from './admin-users.controller';
import { ListingUsersController } from './listing-users.controller';
import { AdminUsersService } from './admin-users.service';
import { ListingUsersService } from './listing-users.service';
import { User, ListingUser } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, ListingUser])],
  controllers: [AdminUsersController, ListingUsersController],
  providers: [AdminUsersService, ListingUsersService],
  exports: [AdminUsersService, ListingUsersService],
})
export class UsersModule {}
