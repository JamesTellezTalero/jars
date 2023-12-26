import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiJwtModel } from 'src/general-models/api-jwt.model';

export class TagsDto {
  @IsString()
  name: string;
  @IsPositive()
  @IsNumber()
  userid: number;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}

export class UpdateTagsDto {
  @IsPositive()
  @IsNumber()
  id: number;
  @IsString()
  name: string;

  @IsOptional()
  jsonWebTokenInfo: ApiJwtModel;
}
