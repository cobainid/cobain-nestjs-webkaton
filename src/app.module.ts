import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
