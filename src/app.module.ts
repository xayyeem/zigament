import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { NotificationsModule } from './modules/notification/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/notification-preferences',
    ),
    PreferencesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
