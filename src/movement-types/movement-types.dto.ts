import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;
}

export class UpdateMovementTypeDto {
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  name: string;
}
