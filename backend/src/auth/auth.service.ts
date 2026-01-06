import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    // Aquí validamos "a mano" por ahora para que puedas entrar
    if (user.email === 'matias@test.com' && user.password === '123456') {
      return {
        accessToken: this.jwtService.sign({ email: user.email }),
      };
    }
    // Si no coincide, lanza error
    throw new UnauthorizedException();
  }
}