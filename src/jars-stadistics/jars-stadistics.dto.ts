import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiJwtModel } from 'src/general-models/api-jwt.model';
import { UsersDto } from 'src/users/users.dto';

export class jarsStadisticsDatesDto {
  @IsDateString({ strict: true })
  inicio: Date;
  @IsDateString({ strict: true })
  final: Date;
  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class jarsStadisticsDto {
  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class jarsStadisticsResponseDto {
  @IsNumber()
  @IsPositive()
  totalIncomes: number;
  @IsNumber()
  @IsPositive()
  totalOutcomes: number;
  @IsNumber()
  @IsPositive()
  balance: number;
}
