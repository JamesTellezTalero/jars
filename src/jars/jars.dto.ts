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

export class JarsDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  color: string;
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  percent: number;
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  userId: number | UsersDto;
}

export class UpdateJarsDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  color: string;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  percent: number;
}
