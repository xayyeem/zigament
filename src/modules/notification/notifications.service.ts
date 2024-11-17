import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from '../preferences/schema/notification-log.schema';
import { SendNotificationDto } from '../preferences/dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto) {
    const { userId, type, channel, content } = sendNotificationDto;

    // Simulating notification sending
    const isSent = Math.random() > 0.2; // 80% chance of success
    const status = isSent ? 'sent' : 'failed';

    const log = new this.notificationLogModel({
      userId,
      type,
      channel,
      status,
      sentAt: isSent ? new Date() : undefined,
      failureReason: isSent ? undefined : 'Failed to deliver',
      metadata: { content },
    });

    return log.save();
  }

  async getNotificationLogs(userId: string) {
    return this.notificationLogModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getNotificationStats() {
    const sentCount = await this.notificationLogModel.countDocuments({
      status: 'sent',
    });
    const failedCount = await this.notificationLogModel.countDocuments({
      status: 'failed',
    });

    return {
      totalNotifications: sentCount + failedCount,
      sent: sentCount,
      failed: failedCount,
    };
  }
}
