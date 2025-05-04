import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import {
  ResetPasswordDto,
  SigninDto,
  SignupDto,
  SocialSignupDto,
} from './dto/sign_up.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'User Signup' }) // ✅ Short description
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    type: SignupDto,
  })
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('social-signin')
  async socialSignup(@Body(ValidationPipe) body: SocialSignupDto) {
    return this.authService.socialSignup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password);
  }
  @Put('reset-password')
  resetPassword(@Body(ValidationPipe) body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile/:id')
  getProfile(@Param('id') id: number) {
    const user = this.userService.findUserById(id);
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  }

  @Get('users')
  getAllUsers() {
    const user = this.userService.findAllUsers();
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  }
}
