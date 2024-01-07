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
import { ApiJwtModel } from 'src/general-models/api-jwt.model';
import { UsersDto } from 'src/users/users.dto';

export class MovementsDto {
  /// si es null asignar el typo de movimiento y los jarrones implicados
  @IsString()
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  desc: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  amount: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  tagid: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  movementType: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  receiverJar: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  senderJar: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class UpdateMovementsDto {
  /// si es null asignar el typo de movimiento y los jarrones implicados
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  desc: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  amount: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  tagid: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  movementType: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  receiverJar: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  senderJar: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}
