import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(dto: any) {
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const user = await this.usersService.create({
            ...dto,
            password: hashedPassword
        })

        return user;
    }

    async login(dto: any) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({
            userId: user._id,
            username: user.name,
            email: user.email
        })

        return { token };
    }
}
