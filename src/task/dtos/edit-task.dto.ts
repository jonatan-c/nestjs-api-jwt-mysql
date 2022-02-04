/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { PartialType, OmitType } from '@nestjs/mapped-types';

// export class EditTaskDTO extends PartialType(
//   OmitType( CreateTaskDTO,  ['title'] as const),
// ) {}

export class EditTaskDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
