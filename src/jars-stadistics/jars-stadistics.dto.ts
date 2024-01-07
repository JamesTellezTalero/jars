import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  inicio: Date;
  @IsDateString({ strict: true })
  @ApiProperty()
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
  @ApiProperty()
  totalIncomes: number;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  totalOutcomes: number;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  balance: number;
}
