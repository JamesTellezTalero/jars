import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
export class ApiResponseModel {
  @ApiProperty({ description: 'Status final' })
  @IsNotEmpty()
  @IsNumber()
  StatusCode: number;
  @ApiProperty({ description: 'Mensaje acorde al desenlace.' })
  @IsNotEmpty()
  @IsString()
  Message: string;
  @ApiProperty({ description: 'Data correspondiente al enpoint solicitado.' })
  @IsNotEmpty()
  Data: any;
}
