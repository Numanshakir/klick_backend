import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string; // ✅ Required for normal signup

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string; // ✅ Required for normal signup
}

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string; // ✅ Required for normal signup

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string; // ✅ Required for normal signup
}

export class SocialSignupDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'test@gmail.com',
    description: 'test@gmail.com',
    nullable: true,
  })
  email?: string | null; // ✅ Optional

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'User name',
    nullable: true,
  })
  name?: string | null; // ✅ Optional

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uid: string; // ✅ Required for social signup

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '12345678',
    description: '12345678',
    nullable: true,
  })
  password?: string | null; // ✅ Required for normal signup
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
