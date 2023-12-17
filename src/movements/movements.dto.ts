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
  title: string;
  @IsOptional()
  @IsString()
  desc: string;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  tagid: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  movementType: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  receiverJar: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  senderJar: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class UpdateMovementsDto {
  /// si es null asignar el typo de movimiento y los jarrones implicados
  @IsNumber()
  @IsPositive()
  id: number;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  desc: string;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  tagid: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  movementType: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  receiverJar: number;
  @IsOptional()
  @IsPositive()
  @IsNumber()
  senderJar: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}
