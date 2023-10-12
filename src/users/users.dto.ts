import { IsBoolean, IsString } from 'class-validator';

export class UsersDto {
  @IsBoolean()
  darkmode: boolean;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  username: string;
  @IsString()
  image: string;
}
