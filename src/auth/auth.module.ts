import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [JwtModule.register(
    {
      secret: "abc123",
      signOptions: { expiresIn: "1h" }
    }),
    PassportModule],
  exports: [AuthService, JwtModule],
})
export class AuthModule {
}
