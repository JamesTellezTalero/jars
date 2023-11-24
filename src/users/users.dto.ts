import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UsersDto {
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

export class LoginUsersDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
