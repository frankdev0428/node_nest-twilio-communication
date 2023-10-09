import { Module } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { WebchatNotificationGateway } from "./webchat-notification.gateway";

@Module({
  providers: [
    NotificationGateway,
    WebchatNotificationGateway,
  ],
  exports: [
    NotificationGateway,
    WebchatNotificationGateway,
  ],
})
export class NotificationModule { }