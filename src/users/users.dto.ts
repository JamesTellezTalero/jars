import {
  IsBoolean,
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
  id: number;
  @IsOptional()
  @IsBoolean()
  darkMode: boolean;
  @IsString()
  @IsEmail()
  email: string;
  @IsStrongPassword()
  @IsString()
  password: string;
  @IsString()
  username: string;
  @IsString()
  image: string;
}

export class UsersUpdateDto {
  @IsPositive()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsBoolean()
  darkMode: boolean;
  @IsString()
  username: string;
}

export class LoginUsersDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class UsersUpdatePasswordDto {
  @IsString()
  email: string;
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
