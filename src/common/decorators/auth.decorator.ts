/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}
