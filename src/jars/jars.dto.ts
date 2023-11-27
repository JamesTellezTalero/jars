import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UsersDto } from 'src/users/users.dto';

export class JarsDto {
  @IsString()
  name: string;
  @IsString()
  color: string;
  @IsPositive()
  @IsNumber()
  percent: number;
  @IsPositive()
  @IsNumber()
  userId: number | UsersDto;
}
