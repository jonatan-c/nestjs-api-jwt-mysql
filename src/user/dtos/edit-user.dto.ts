import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
/* eslint-disable prettier/prettier */

import { IsOptional } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
