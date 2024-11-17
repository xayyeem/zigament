import * as mongoose from 'mongoose';

export const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  preferences: {
    marketing: { type: Boolean, required: true },
    newsletter: { type: Boolean, required: true },
    updates: { type: Boolean, required: true },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'never'],
      required: true,
    },
    channels: {
      email: { type: Boolean, required: true },
      sms: { type: Boolean, required: true },
      push: { type: Boolean, required: true },
    },
  },
  timezone: { type: String, required: true },
  createdAt: { type: Date, required: true },
  lastUpdated: { type: Date, required: true },
});

export interface UserPreference extends mongoose.Document {
  userId: string;
  email: string;
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: string;
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  timezone: string;
  createdAt: Date;
  lastUpdated: Date;
}
