import { useCallback, useEffect } from 'react';
import { NotificationOptions } from '@/types';

export function useNotifications() {
  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = useCallback((options: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  }, []);

  const scheduleEventReminder = useCallback((event: any) => {
    // In a real app, this would schedule actual notifications
    // For demo purposes, we'll show an immediate notification
    setTimeout(() => {
      sendNotification({
        title: 'Wedding Reminder',
        body: `Don't forget about ${event.title} on ${new Date(event.date).toLocaleDateString()}!`,
      });
    }, 2000);
  }, [sendNotification]);

  const sendRegistrationConfirmation = useCallback((event: any) => {
    sendNotification({
      title: 'Registration Confirmed!',
      body: `You're registered for ${event.title} on ${new Date(event.date).toLocaleDateString()}`,
    });
  }, [sendNotification]);

  return {
    sendNotification,
    scheduleEventReminder,
    sendRegistrationConfirmation,
  };
}
