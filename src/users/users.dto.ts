import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UsersDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  id: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  darkMode: boolean;
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsStrongPassword()
  @IsString()
  @ApiProperty()
  password: string;
  @IsString()
  @ApiProperty()
  username: string;
  @IsString()
  @ApiProperty()
  image: string;
}

export class UsersUpdateDto {
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  darkMode: boolean;
  @IsString()
  @ApiProperty()
  username: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  cute_off_date: string;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  general_income: number;
}

export class UsersUpdateCuteOffDateDto {
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  cute_off_date: string;
}

export class LoginUsersDto {
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  password: string;
}

export class UsersUpdatePasswordDto {
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  oldPassword: string;
  @IsString()
  @ApiProperty()
  newPassword: string;
}
