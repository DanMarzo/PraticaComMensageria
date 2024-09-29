import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validarToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    const usuario = payload.authUser;
    return usuario;
  }
}
