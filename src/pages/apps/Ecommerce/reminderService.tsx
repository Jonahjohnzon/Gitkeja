import axios from 'axios';
import { RentPayment } from '../../../types';

interface ReminderOptions {
  method: 'email' | 'sms' | 'both';
  message?: string;
}

export const sendPaymentReminder = async (payment: RentPayment, options: ReminderOptions = { method: 'both' }): Promise<void> => {
  try {
    // In a real application, this would be an API call to send the reminder
    // For now, we'll simulate it with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    const defaultMessage = `Dear ${payment.tenantName},\n\nThis is a friendly reminder that your rent payment of KES ${payment.amount} for ${payment.propertyName} is due on ${new Date(payment.dueDate).toLocaleDateString()}. Please ensure timely payment to avoid any late fees.\n\nIf you have already made the payment, please disregard this message.\n\nThank you for your cooperation.\n\nBest regards,\nKeja Plus Property Management`;

    const message = options.message || defaultMessage;

    if (options.method === 'email' || options.method === 'both') {
      console.log(`Sending email reminder to ${payment.tenantName}`);
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Email reminder sent successfully');
    }

    if (options.method === 'sms' || options.method === 'both') {
      console.log(`Sending SMS reminder to ${payment.tenantName}`);
      // Simulate sending SMS
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('SMS reminder sent successfully');
    }

    console.log(`Reminder sent successfully to ${payment.tenantName} for payment due on ${payment.dueDate}`);
  } catch (error) {
    console.error('Error sending payment reminder:', error);
    throw error;
  }
};

export const scheduleAutomaticReminders = async (payments: RentPayment[]): Promise<void> => {
  try {
    const currentDate = new Date();
    const reminderThreshold = 5; // days before due date

    for (const payment of payments) {
      const dueDate = new Date(payment.dueDate);
      const daysDifference = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

      if (daysDifference <= reminderThreshold && payment.status !== 'Paid') {
        await sendPaymentReminder(payment);
      }
    }

    console.log('Automatic reminders scheduled successfully');
  } catch (error) {
    console.error('Error scheduling automatic reminders:', error);
    throw error;
  }
};
