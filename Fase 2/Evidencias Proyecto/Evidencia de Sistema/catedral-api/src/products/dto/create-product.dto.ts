import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value
  )
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // array de ObjectId de categorías
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[]; 

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  img_url?: string;

  // stock inicial (opcional, default 0)
  @Type(() => Number)
  @IsNumber()
  @Min(0) 
  @IsOptional()
  initialQuantity?: number = 0;

}
