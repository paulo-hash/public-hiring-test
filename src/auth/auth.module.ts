import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register(
    {
      secret: "abc123",
      signOptions: { expiresIn: "1h" }
    }

  )]
})
export class AuthModule {
}
