import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { sessionsProviders } from './sessions.providers';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';
import { RolesService } from 'src/roles/roles.service';
import { rolesProviders } from 'src/roles/roles.providers';
import { ResourcesService } from 'src/resources/resources.service';
import { resourcesProviders } from 'src/resources/resources.providers';
import { rolesResourcesProviders } from 'src/database/roles-resources.providers';
import { MailService } from 'src/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    ...sessionsProviders,
    UsersService,
    ...usersProviders,
    RolesService,
    ...rolesProviders,
    ResourcesService,
    ...resourcesProviders,
    ...rolesResourcesProviders,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
