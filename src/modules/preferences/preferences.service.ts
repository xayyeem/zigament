import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UserPreference } from './schema/user-preference.schema';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('UserPreference')
    private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  async createPreference(createPreferenceDto: CreatePreferenceDto) {
    const createdPreference = new this.userPreferenceModel(createPreferenceDto);
    return createdPreference.save();
  }

  async getPreference(userId: string) {
    return this.userPreferenceModel.findOne({ userId });
  }

  async updatePreference(userId: string, updateData: UpdatePreferenceDto) {
    return this.userPreferenceModel.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
  }

  async deletePreference(userId: string) {
    return this.userPreferenceModel.findOneAndDelete({ userId });
  }
}
