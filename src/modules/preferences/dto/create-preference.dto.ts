import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Never = 'never',
}

class Channels {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

class Preferences {
  @IsBoolean()
  marketing: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsBoolean()
  updates: boolean;

  @IsEnum(Frequency)
  frequency: Frequency;

  @IsObject()
  @ValidateNested()
  @Type(() => Channels)
  channels: Channels;
}

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => Preferences)
  preferences: Preferences;

  @IsString()
  timezone: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  lastUpdated: Date;
}
