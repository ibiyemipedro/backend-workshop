export enum NotificationType {
  EMAIL = 'email',
  TEXT = 'text',
  IN_APP = 'in-app',
}

export interface NotificationPayload {
  userId: string;
  title: string;
  description: string;
  notificationType: NotificationType;
}