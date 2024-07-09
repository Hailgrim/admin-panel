import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

import d from 'locales/dictionary';
import { UpdateUserFields } from '../users.types';

export class UpdateUserDto implements UpdateUserFields {
  @ApiProperty({ example: 'user@mail.com', description: d['en'].email })
  @IsOptional()
  @IsEmail({}, { message: d['en'].incorrect(d['en'].email) })
  @Length(5, 100, {
    message: d['en'].fieldLength(d['en'].email, 5, 100),
  })
  email?: string;

  @ApiProperty({ example: '1q2w3e4r5', description: d['en'].password })
  @IsOptional()
  @IsStrongPassword({}, { message: d['en'].mustBeAStrong(d['en'].password) })
  @Length(10, 100, {
    message: d['en'].fieldLength(d['en'].password, 10, 100),
  })
  password?: string;

  @ApiProperty({ example: 'Linus Torvalds', description: d['en'].name })
  @IsOptional()
  @IsString({
    message: d['en'].mustBeAString(d['en'].name),
  })
  @Length(1, 100, {
    message: d['en'].fieldLength(d['en'].name, 1, 100),
  })
  name?: string;

  @ApiProperty({ example: true, description: d['en'].status })
  @IsOptional()
  @IsBoolean({
    message: d['en'].mustBeABoolean(d['en'].status),
  })
  enabled?: boolean;
}
