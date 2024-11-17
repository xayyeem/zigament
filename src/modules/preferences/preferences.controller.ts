// src/modules/preferences/preferences.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UserPreference } from './schema/user-preference.schema';

@Controller('/api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  async createPreference(
    @Body() createPreferenceDto: CreatePreferenceDto,
  ): Promise<UserPreference> {
    try {
      return await this.preferencesService.createPreference(
        createPreferenceDto,
      );
    } catch (error) {
      throw new NotFoundException('Error creating preference');
    }
  }

  @Get(':userId')
  async getPreference(
    @Param('userId') userId: string,
  ): Promise<UserPreference> {
    const preference = await this.preferencesService.getPreference(userId);
    if (!preference) {
      throw new NotFoundException('User preferences not found');
    }
    return preference;
  }

  @Patch(':userId')
  async updatePreference(
    @Param('userId') userId: string,
    @Body() updateData: UpdatePreferenceDto, // Ensure this is UpdatePreferenceDto
  ): Promise<UserPreference> {
    const updatedPreference = await this.preferencesService.updatePreference(
      userId,
      updateData,
    );
    if (!updatedPreference) {
      throw new NotFoundException('User preferences not found for update');
    }
    return updatedPreference;
  }

  @Delete(':userId')
  async deletePreference(@Param('userId') userId: string): Promise<void> {
    const result = await this.preferencesService.deletePreference(userId);
    if (!result) {
      throw new NotFoundException('User preferences not found for deletion');
    }
  }
}
