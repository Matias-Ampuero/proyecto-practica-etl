import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // <--- IMPORTANTE

@Module({
  imports: [
    // Aquí es donde le enseñamos al módulo qué es JWT
    JwtModule.register({
      secret: 'SECRET_KEY_SECRETA',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}