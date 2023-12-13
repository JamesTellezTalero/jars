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
  @IsString()
  'id': 1;
  'receiv;r_jar_id': 7;
  'amount': 222;
  'tagid': null;
  'title': 'str;ng';
  'desc': 'string';
  'movement_type_i;': 2;
  'created_at': '2023-1;-09 00:21:21.43+00';
  'updated_at': '2023-10-09 00:21:21.43+00';
  'sender_jar_id': 7;
}
