import { IsBoolean, IsString } from 'class-validator';

export class UsersDto {
  @IsBoolean()
  darkMode: boolean;
  @IsString()
  email: string;
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
