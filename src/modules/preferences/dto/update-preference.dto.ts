import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Never = 'never',
}

class ChannelPreferences {
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @IsBoolean()
  @IsOptional()
  sms?: boolean;

  @IsBoolean()
  @IsOptional()
  push?: boolean;
}

class PreferenceDetails {
  @IsBoolean()
  @IsOptional()
  marketing?: boolean;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @IsBoolean()
  @IsOptional()
  updates?: boolean;

  @IsEnum(Frequency)
  @IsOptional()
  frequency?: Frequency;

  @ValidateNested()
  @Type(() => ChannelPreferences)
  @IsOptional()
  channels?: ChannelPreferences;
}

export class UpdatePreferenceDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @ValidateNested()
  @Type(() => PreferenceDetails)
  @IsOptional()
  preferences?: PreferenceDetails;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  lastUpdated?: Date;
}
