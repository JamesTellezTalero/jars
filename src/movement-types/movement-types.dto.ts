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

export class MovementTypeDto {
  @IsString()
  name: string;
}

export class UpdateMovementTypeDto {
  @IsPositive()
  @IsNumber()
  id: number;
  @IsString()
  name: string;
}
