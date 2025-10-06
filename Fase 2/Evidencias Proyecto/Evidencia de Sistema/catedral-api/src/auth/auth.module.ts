import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET', 'change-me'),
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRES_IN', '1d') },
      }),
    }),
    MongooseModule.forFeature([
      { 
        name: ResetToken.name, 
        schema: ResetTokenSchema,
      },
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
