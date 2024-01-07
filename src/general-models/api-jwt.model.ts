import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { number } from 'joi';
export class ApiJwtModel {
  @ApiProperty({
    description: 'Fecha de emisión: El tiempo en que se emitió el token.',
  })
  @IsNotEmpty()
  @IsDate()
  iat: Date | number;
  @ApiProperty({
    description:
      'Fecha de expiración: El tiempo después del cual el token expirará y no debería ser aceptado.',
  })
  @IsNotEmpty()
  @IsDate()
  exp: Date | number;
  @ApiProperty({
    description: 'Identificador: Email del usuario logueado.',
  })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  email: string;
}
