import { Notification } from "../types";
import { mockDelay } from "./mockDelay";
import {
  getNotificationsByUserId,
  getUnreadCount,
  getUnreadNotifications,
  markAllAsRead,
  markAsRead,
} from "./mockNotifications";

// TODO: Replace with real API calls when backend is ready

export const getNotifications = async (
  userId: string,
): Promise<Notification[]> => {
  return mockDelay(getNotificationsByUserId(userId));
};

export const getUnreadNotificationsService = async (
  userId: string,
): Promise<Notification[]> => {
  return mockDelay(getUnreadNotifications(userId));
};

export const getUnreadCountService = async (
  userId: string,
): Promise<number> => {
  return mockDelay(getUnreadCount(userId));
};

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  markAsRead(notificationId);
  return mockDelay(undefined, 300); // Quick response for UX
};

export const markAllNotificationsAsRead = async (
  userId: string,
): Promise<void> => {
  markAllAsRead(userId);
  return mockDelay(undefined, 500);
};
