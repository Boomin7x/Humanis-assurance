import { Notification, NotificationType } from "../types";

// 7 notifications with mix of types and read status
export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    userId: "customer-1",
    type: "policy_expiring" as NotificationType,
    title: "Policy Renewal Reminder",
    message:
      "Your Comprehensive Motor Insurance policy (HM-2024-001234) expires in 30 days. Renew now to avoid coverage gaps.",
    date: new Date("2024-01-20T09:00:00Z"),
    read: false,
    actionUrl: "/portal/customer/renewals",
    priority: "high",
    expiresAt: new Date("2025-01-14T23:59:59Z"),
  },
  {
    id: "notif-002",
    userId: "customer-002",
    type: "payment_pending" as NotificationType,
    title: "Payment Due Soon",
    message:
      "Your Q3 2024 premium payment of XAF 300,000 for Home & Contents Insurance is due on September 1st.",
    date: new Date("2024-01-18T14:30:00Z"),
    read: true,
    actionUrl: "/portal/customer/payments",
    priority: "medium",
    expiresAt: new Date("2024-09-01T23:59:59Z"),
  },
  {
    id: "notif-003",
    userId: "customer-1",
    type: "claim_update" as NotificationType,
    title: "Claim Update Available",
    message:
      "Your motor insurance claim (CLM-2024-001567) has been approved for settlement. Payment of XAF 2,850,000 is being processed.",
    date: new Date("2024-01-21T11:15:00Z"),
    read: false,
    actionUrl: "/portal/customer/claims/clm-002",
    priority: "high",
  },
  {
    id: "notif-004",
    userId: "customer-004",
    type: "payment_pending" as NotificationType,
    title: "Payment Overdue",
    message:
      "Your February health insurance premium of XAF 150,000 is overdue. Please make payment to avoid policy suspension.",
    date: new Date("2024-01-19T16:45:00Z"),
    read: false,
    actionUrl: "/portal/customer/payments",
    priority: "high",
    expiresAt: new Date("2024-03-15T23:59:59Z"),
  },
  {
    id: "notif-005",
    userId: "customer-010",
    type: "claim_update" as NotificationType,
    title: "Claim Investigation Update",
    message:
      "Investigation of your fire damage claim (CLM-2024-002789) is progressing. Electrical inspection report has been completed.",
    date: new Date("2024-01-19T15:20:00Z"),
    read: true,
    actionUrl: "/portal/customer/claims/clm-006",
    priority: "medium",
  },
  {
    id: "notif-006",
    userId: "agent-1",
    type: "policy_expiring" as NotificationType,
    title: "Multiple Policies Expiring",
    message:
      "3 policies in your portfolio are expiring within the next 30 days. Review and follow up with customers.",
    date: new Date("2024-01-17T08:30:00Z"),
    read: true,
    actionUrl: "/portal/agent/expiring",
    priority: "medium",
  },
  {
    id: "notif-007",
    userId: "agent-1",
    type: "system_alert" as NotificationType,
    title: "Commission Payment Processed",
    message:
      "Commission payments totaling XAF 1,958,500 have been processed for Q1 2024. Check your commission dashboard for details.",
    date: new Date("2024-01-16T12:00:00Z"),
    read: true,
    actionUrl: "/portal/agent/commissions",
    priority: "low",
  },
];

// Helper functions
export const getNotificationById = (id: string): Notification | undefined => {
  return mockNotifications.find((notification) => notification.id === id);
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return mockNotifications
    .filter((notification) => notification.userId === userId)
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Most recent first
};

export const getUnreadNotifications = (userId: string): Notification[] => {
  return getNotificationsByUserId(userId).filter(
    (notification) => !notification.read,
  );
};

export const getUnreadCount = (userId: string): number => {
  return getUnreadNotifications(userId).length;
};

export const getNotificationsByType = (
  userId: string,
  type: NotificationType,
): Notification[] => {
  return getNotificationsByUserId(userId).filter(
    (notification) => notification.type === type,
  );
};

export const getNotificationsByPriority = (
  userId: string,
  priority: "low" | "medium" | "high",
): Notification[] => {
  return getNotificationsByUserId(userId).filter(
    (notification) => notification.priority === priority,
  );
};

export const getRecentNotifications = (
  userId: string,
  limit: number = 5,
): Notification[] => {
  return getNotificationsByUserId(userId).slice(0, limit);
};

// In-memory state for demo (in real app, this would be handled by backend)
let notificationsState = [...mockNotifications];

export const markAsRead = (
  notificationId: string,
): Notification | undefined => {
  const notification = notificationsState.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
  return notification;
};

export const markAllAsRead = (userId: string): void => {
  notificationsState.forEach((notification) => {
    if (notification.userId === userId) {
      notification.read = true;
    }
  });
};

export const deleteNotification = (notificationId: string): boolean => {
  const index = notificationsState.findIndex((n) => n.id === notificationId);
  if (index > -1) {
    notificationsState.splice(index, 1);
    return true;
  }
  return false;
};

export const addNotification = (
  notification: Omit<Notification, "id">,
): Notification => {
  const newNotification: Notification = {
    ...notification,
    id: `notif-${Date.now()}`,
  };

  notificationsState.unshift(newNotification); // Add to beginning
  return newNotification;
};

// Reset function for demo purposes
export const resetNotificationsState = (): void => {
  notificationsState = [...mockNotifications];
};
