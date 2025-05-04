import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ResetPasswordDto,
  SignupDto,
  SocialSignupDto,
} from './dto/sign_up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    return this.userService.createUser( dto.email, dto.password);
  }

  async socialSignup(dto: SocialSignupDto) {
    const user = await this.userService.findUserByUID(dto.uid);
    if (!user) {
      const newUser = await this.userService.createSocialUser(dto);
      const token = this.jwtService.sign({ userId: newUser.id });
      return { access_token: token, newUser };
    } else {
      const token = this.jwtService.sign({ userId: user.id });
      return { access_token: token, user };
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ userId: user.id });
    return { access_token: token, user };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.userService.updatePassword(
      user.id,
      undefined,
      dto.email,
      dto.password,
    );
  }
}
