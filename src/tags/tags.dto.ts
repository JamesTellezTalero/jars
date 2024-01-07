import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiJwtModel } from 'src/general-models/api-jwt.model';

export class TagsDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  userid: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class UpdateTagsDto {
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}
