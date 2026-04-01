import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import admin from 'src/config/firebase';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: any) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return user;
  }

  async login(dto: any) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      userId: user._id,
      username: user.name,
      email: user.email,
    });

    return {
      user: { token, userId: user.id, username: user.name, email: user.email },
    };
  }

  async googleLogin(firebaseToken: string) {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const email = decoded.email;
    const name = decoded.name;

    let user = await this.usersService.findByEmail(email as string);

    if (!user) {
      user = await this.usersService.create({
        email,
        name,
        provider: 'google',
      });
    }

    const token = this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }
}
