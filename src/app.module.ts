import { Module } from '@nestjs/common';
import { UsersModule, RolesModule, AuthModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RolesModule,
    UsersModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
