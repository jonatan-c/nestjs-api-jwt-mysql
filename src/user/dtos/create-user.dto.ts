import { EnumToString } from './../../common/helpers/enumToString';
import { AppRoles } from './../../app.roles';
/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `Invalid role, ${EnumToString(AppRoles)} `,
  })
  roles: string[];
}
