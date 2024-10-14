import { Paymentprop } from '../../../types';
import { APICore } from '../../../helpers/api/apiCore';
interface ReminderOptions {
  method: 'email' | 'sms' | 'both';
  message?: string;
}

const api = new APICore
export const sendPaymentReminder = async (payment:Paymentprop, options: ReminderOptions = { method: 'both' }): Promise<any> => {
  try {
    // In a real application, this would be an API call to send the reminder
    // For now, we'll simulate it with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data ={
      payment,
      options
    }

    const result = await api.create('/api/sendReminder', data)
    return result
    

  } catch (error) {
    console.error('Error sending payment reminder:', error);
    throw error;
  }
};

export const scheduleAutomaticReminders = async (payments:Paymentprop[]): Promise<void> => {
  try {
    const currentDate = new Date();
    const reminderThreshold = 5; // days before due date

    for (const payment of payments) {
      const dueDate = new Date(payment.leaseEndDate);
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
